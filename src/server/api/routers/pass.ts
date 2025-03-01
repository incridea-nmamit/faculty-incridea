import { z } from "zod";
import { createTRPCRouter, facultyProcedure, protectedProcedure } from "../trpc";
import { Relation } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const passRouter = createTRPCRouter({
  claimFacultyPass: facultyProcedure
    .input(
      z.object({
        phoneNumber: z.string().min(10).max(10).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          email: ctx.session.user.email,
        },
        data: {
          passClaimed: true,
          phoneNumber: input.phoneNumber,
        },
      });
      const phone = input.phoneNumber ?? "";
      const response = await fetch(
        `${env.CAPTURE_INCRIDEA_URL}/api/verifiedEmail`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.CAPTURE_INCRIDEA_SECRET}`,
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            phoneNumber: phone,
            specialType: "faculty",
          }),
        },
      );

      if (response.status === 200) {
        await ctx.db.user.update({
          where: {
            email: ctx.session.user.email,
          },
          data: {
            captureUpdated: true,
          },
        });
      }

      return user;
    }),

  claimExtraPass: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
        relation: z.nativeEnum(Relation),
      })
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
          age: input.age,
          relation: input.relation,
          userId: ctx.session.user.id,
        },
      });
    }),

  getExtraPasses: facultyProcedure.query(async ({ ctx }) => {
    return await ctx.db.extraPass.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
