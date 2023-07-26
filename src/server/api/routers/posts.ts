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
      orderBy: {createdAt: 'desc'},
    });

    const likes = await ctx.prisma.postLikes.findMany({
      where: {
        postId: { in: posts.map((post) => post.id) },
      },
    });

    return posts.map((post) => (
      {
        post,
        author: users.find((user) => user.id === post.authorId),
        likes: likes.filter((like) => like.postId === post.id),
      }
    ));
  }),

  getPostsByUserId: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input, ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      where: {
        authorId: input.userId,
      },
      take: 100,
    });
    const users = await ctx.prisma.user.findMany({
      take: 100,
    });
    const likes = await ctx.prisma.postLikes.findMany({
      where: {
        postId: { in: posts.map((post) => post.id) },
      },
    });

    return posts.map((post) => (
      {
        post,
        author: users.find((user) => user.id === post.authorId),
        likes: likes.filter((like) => like.postId === post.id),
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

  like: protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const postId = input.postId;

    const like = await ctx.prisma.postLikes.create({
      data: {
        authorId: userId,
        postId: postId,
      },
    });
    return like;
  }),
  
  //Check if user has liked post
  hasLiked: protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const postId = input.postId;

    const like = await ctx.prisma.postLikes.findFirst({
      where: {
        authorId: userId,
        postId: postId,
      },
    });
    return like ? true : false;
  }),




  //TODO : instantiate unlike functiionality
  unlike: protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    //TODO this might be kinda hacky
    const userId = ctx.session.user.id;
    const like = await ctx.prisma.postLikes.deleteMany({
      where: {
        authorId: userId,
        postId: input.postId,
      },
    });
    return like;
  }),
});
