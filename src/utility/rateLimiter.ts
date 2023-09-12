// This piece of code is exact implementation from Nextjs Canary Example
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.ts
// This can cause the server to slow down if the cache is hold for longer time for many users.

import { NextApiResponse, NextApiRequest } from "next";
import { LRUCache } from "lru-cache";

type options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
  getUserId: (req: NextApiRequest, res: NextApiResponse) => string;
};

export function rateLimiterApi(options?: options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 50,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res: NextApiResponse, req: NextApiRequest, limit: number) =>
      new Promise<{ status: number; message: string }>((resolve, reject) => {
        try {
          const userId = options?.getUserId(req, res);
          if (!userId) {
            reject({ status: 400, message: "Token missing" });
            return;
          }
          const token = `user:${userId}`;

          const tokenCount = (tokenCache.get(token) as number[]) || [0];
          if (tokenCount[0] === 0) {
            tokenCache.set(token, tokenCount);
          }
          tokenCount[0] += 1;

          const currentUsage = tokenCount[0];
          const isRateLimited = currentUsage >= limit;
          res.setHeader("X-RateLimit-Limit", limit);
          res.setHeader(
            "X-RateLimit-Remaining",
            isRateLimited ? 0 : limit - currentUsage,
          );

          if (isRateLimited) {
            reject({ status: 429, message: "Rate limit exceeded" });
          } else {
            resolve({ status: 200, message: "Success" });
          }
        } catch {
          reject({ status: 500, message: "Internal server error" });
        }
      }),
  };
}
