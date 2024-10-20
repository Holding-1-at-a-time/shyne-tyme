// convex/appointments.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAppointment = mutation({
  args: {
    userId: v.id("users"),
    service: v.string(),
    date: v.string(),
    time: v.string(),
  },
  handler: async (ctx, args) => {
    const appointmentId = await ctx.db.insert("appointments", {
      userId: args.userId,
      service: args.service,
      date: args.date,
      time: args.time,
      status: "scheduled",
    });
    return appointmentId;
  },
});

export const getAppointments = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("appointments")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});