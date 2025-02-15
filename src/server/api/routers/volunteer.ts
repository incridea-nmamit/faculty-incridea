import { z } from "zod";
import { createTRPCRouter, volunteerProcedure } from "../trpc";
import { dependantID2Num, facultyID2Num } from "~/lib/utils";
import { TRPCError } from "@trpc/server";

export const volunteerRouter = createTRPCRouter({
  markAttended: volunteerProcedure
    .input(
      z.object({
        passId: z.string(),
        day: z.enum(["1", "2"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const type = input.passId.startsWith("F") ? "faculty" : "dependant";
      if (type === "faculty") {
        const facultyId = facultyID2Num(input.passId);
        const faculty = await ctx.db.user.findUnique({
          where: {
            id: facultyId,
          },
        });
        if (!faculty) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Faculty not found",
          });
        }
        if (input.day === "1" && faculty.attendedDay1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Faculty already marked as attended for day 1",
          });
        } else {
          await ctx.db.user.update({
            where: {
              id: facultyId,
            },
            data: {
              attendedDay1: true,
            },
          });
        }
        if (input.day === "2" && faculty.attendedDay2) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Faculty already marked as attended for day 2",
          });
        } else {
          await ctx.db.user.update({
            where: {
              id: facultyId,
            },
            data: {
              attendedDay2: true,
            },
          });
        }
      } else {
        const extraPassId = dependantID2Num(input.passId);
        const extraPass = await ctx.db.extraPass.findUnique({
          where: {
            id: extraPassId,
          },
        });
        if (!extraPass) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Dependant not found",
          });
        }
        if (input.day === "1" && extraPass.attendedDay1) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dependant already marked as attended for day 1",
          });
        } else {
          await ctx.db.extraPass.update({
            where: {
              id: extraPassId,
            },
            data: {
              attendedDay1: true,
            },
          });
        }
        if (input.day === "2" && extraPass.attendedDay2) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Dependant already marked as attended for day 2",
          });
        } else {
          await ctx.db.extraPass.update({
            where: {
              id: extraPassId,
            },
            data: {
              attendedDay2: true,
            },
          });
        }
      }
    }),
});
