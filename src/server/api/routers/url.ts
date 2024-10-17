import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const urlRouter = createTRPCRouter({
  createShortUrl : publicProcedure
  .input(z.object({originUrl : z.string()}))
  .query(({input}) => {
    return null;
  }),
  getOriginalUrl : publicProcedure
  .input(z.object({shortUrl : z.string()}))
  .query(({input}) => {
    return null;
  })
});
