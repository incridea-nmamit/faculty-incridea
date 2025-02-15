import { z } from "zod";
import { createTRPCRouter, facultyProcedure } from "../trpc";
import { Relation } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const passRouter = createTRPCRouter({
  getFacultyPass: facultyProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.user.update({
      where: {
        email: ctx.session.user.email,
      },
      data: {
        passClaimed: true,
      },
    });
  }),

  getExtraPass: facultyProcedure
    .input(
      z.object({
        name: z.string(),
        relation: z.nativeEnum(Relation),
        age: z.number(),
        idProof: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const extraPasses = await ctx.db.user.findUnique({
        where: {
          email: ctx.session.user.email,
        },
        include: {
          ExtraPass: true,
        },
      });
      if (extraPasses?.ExtraPass.length === 2) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only claim 2 extra passes",
        });
      }
      return await ctx.db.extraPass.create({
        data: {
          name: input.name,
          relation: input.relation,
          age: input.age,
          idProof: input.idProof,
          DependantOn: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    }),
});
