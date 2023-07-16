import type { User, Prisma} from '@prisma/client';
import { TRPCError } from "@trpc/server";
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from '~/server/db';
export const filterUser = (user: User) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
    };
};

export const profileRouter = createTRPCRouter({
    getUserByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
      .query(async ({input, ctx}) => {
        const user = await ctx.prisma.user.findFirst({
            where: {
                name: input.username 
            },
        });
       return user; 
    }),
});
