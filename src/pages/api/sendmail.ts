import { NextApiRequest, NextApiResponse } from "next";

import { ValidationError } from "yup";

import { mailValidationSchema } from "@/components/contact-form/contact-form";
import { rateLimiterApi, getUserId } from "@/utility/rate-limiter";
import { sendMail } from "@/utility/sendMail";

const REQUEST_PER_HOUR = 5 as const;
const RATELIMIT_DURATION = 3600000 as const;
const MAX_USER_PER_SECOND = 100 as const;

/*
  Rate Limiting Strategy:

  WARNING: This rate limiting strategy uses a combination of client IP address and user agent for identification.
  - Pros: Provides a more robust identification mechanism.
  - Cons:
    - This approach fails if we have multiple servers running as the LRU cache is bound to server's local memory which is fine for small apps which do not require to scale
    - Users behind certain proxies or networks might share the same IP address.
    - Determined attackers can still potentially circumvent these measures.
    - Privacy concerns: Collecting IP addresses and user agents may raise privacy considerations.
  
  If either the client's IP address or user agent is missing, a fallback mechanism defaults to using a UUID stored in cookies.
  - Pros: Ensures a default identification mechanism is in place.
  - Cons: UUIDs may not be entirely foolproof and can be manipulated by users.

  Always consider the privacy implications of collecting and using such information. Be transparent with users about the data you collect for rate limiting purposes.
*/
const limiter = rateLimiterApi({
  interval: RATELIMIT_DURATION,
  uniqueTokenPerInterval: MAX_USER_PER_SECOND,
  getUserId,
});

export type MailRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ status: number; message: string | string[] }>,
) => {
  try {
    const { method } = req;
    if (method !== "POST") {
      res.status(405).json({
        status: 405,
        message: `Method not allowed`,
      });
      return;
    }
    const body: MailRequestBody = req.body;

    const isRateLimited = await limiter.check(res, req, REQUEST_PER_HOUR);
    if (isRateLimited.status !== 200) return;

    try {
      await mailValidationSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        res.status(422).json({
          status: 422,
          message: validationError.errors,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
      return;
    }

    const { name, email, subject, message } = body;

    const response = await sendMail(name, email, subject, message);
    res.status(response.status).send(response);
  } catch (error: any) {
    if (error?.status === 429) {
      res.status(429).json({ status: 429, message: "Rate limit exceeded" });
    } else {
      res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || "Internal server error",
      });
    }
  }
};

export default handler;
