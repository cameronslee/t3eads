import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      take: 100,
    });
    const posts = await ctx.prisma.post.findMany({
      where: {
        authorId: { in: users.map((user) => user.id) },
      },
      take: 100,
    });

    return posts.map((post) => (
      {
        post,
        author: users.find((user) => user.id === post.authorId),
      }
    ));
  }),

  create: protectedProcedure 
  .input(
    z.object({
      content: z.string().min(1).max(100),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const authorId = ctx.session.user.id;

    const post = await ctx.prisma.post.create({
      data: {
        authorId,
        content: input.content
      },
    });
    return post;
  }),
});