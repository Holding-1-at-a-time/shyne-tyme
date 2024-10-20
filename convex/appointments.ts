/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 13:01:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// File Path: convex\appointments.ts

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
    const { userId, service, date,}
    await ensureAuthenticated(ctx); // Use the middleware
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
    })
    await ensureAuthenticated(ctx); // Use the middleware
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
    await ensureAuthenticated(ctx); // Use the middleware
    return await ctx.db
      .query("appointments")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});