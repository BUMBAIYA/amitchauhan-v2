import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import { v4 } from "uuid";
import { rateLimiterApi } from "@/utility/rateLimiter";
import { verifyEmailAddress } from "@/utility/verifyEmail";

const REQUEST_PER_HOUR = 5 as const;
const RATELIMIT_DURATION = 3600000 as const;
const MAX_USER_PER_SECOND = 100 as const;

const limiter = rateLimiterApi({
  interval: RATELIMIT_DURATION,
  uniqueTokenPerInterval: MAX_USER_PER_SECOND,
  getUserId: (req: NextApiRequest, res: NextApiResponse) => {
    let userUuidToken = req.cookies.userUuid;
    if (!userUuidToken) {
      userUuidToken = v4();
      res.setHeader(
        "Set-Cookie",
        `userUuid=${userUuidToken}; Max-Age=${60 * 60 * 24}; SameSite=Strict`,
      );
    }
    return userUuidToken;
  },
});

type MailRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const sendMail = async function (
  name: string,
  email: string | "SELF",
  subject: string,
  message: string,
): Promise<{ status: number; message: string }> {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: process.env.NODEMAILER_USER,
    subject: "Portfolio: [" + subject + " ]",
    text: `${name}: <${email}>\n${message}`,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        resolve({ status: 500, message: "Failed to send mail" });
      } else {
        resolve({ status: 200, message: "Mail send successfully" });
      }
    });
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ status: number; message: string }>,
) => {
  try {
    const { method } = req;
    const data: MailRequestBody = req.body;

    const isRateLimited = await limiter.check(res, req, REQUEST_PER_HOUR);
    if (isRateLimited.status !== 200) return;

    if (!data.name || !data.email || !data.subject || !data.message) {
      // Validate json body
      res.status(400).json({
        status: 400,
        message: "Fill the entire form",
      });
      return;
    }

    const { name, email, subject, message } = data;

    // Verify email
    // !!!IMPORTANT: This verification strategy is not standard it can reject some valid email address
    if (!verifyEmailAddress(email)) {
      res.status(400).json({
        status: 400,
        message: "Invalid Email address",
      });
      return;
    }

    switch (method) {
      case "POST": {
        const data = await sendMail(name, email, subject, message);
        res.status(200).send(data);
        break;
      }
      default: {
        res.status(400).json({
          status: 405,
          message: `[${method}] is not allowed`,
        });
      }
    }
  } catch (error: any) {
    if (error?.status === 429) {
      res.status(429).json({ status: 429, message: "Rate limit exceeded" });
    } else {
      res.status(error.status || 500).json({
        status: 500,
        message: error.message || "Internal server error",
      });
    }
  }
};

export default handler;
