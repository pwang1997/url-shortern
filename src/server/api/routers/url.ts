import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { urls } from "~/server/db/schema";

export const urlRouter = createTRPCRouter({
  createShortUrl : publicProcedure
  .input(z.object({longUrl : z.string(), domain : z.string(), shortUrl : z.string()}))
  .mutation(async ({input, ctx}) => {
    await ctx.db.transaction(async(tx) => {
      await tx.insert(urls)
      .values({
        longUrl : input.longUrl,
        domain : input.domain,
        shortUrl : input.shortUrl
      });
    });
    return {shortUrl : input.shortUrl, domain : input.domain};
  }),
  getOriginalUrl : publicProcedure
  .input(z.object({shortUrl : z.string()}))
  .query(async({input, ctx}) => {
    return await ctx.db.select({longUrl : urls.longUrl}).from(urls).where(eq(urls.shortUrl, input.shortUrl));
  })
});
