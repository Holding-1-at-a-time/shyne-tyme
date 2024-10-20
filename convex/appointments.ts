/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 10:16:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// convex/appointments.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Creates a new appointment in the system.
 * 
 * @param ctx - The context object.
 * @param args - The arguments including user ID, service details, date, and time.
 * @returns {Promise} A promise that resolves to the ID of the created appointment.
 */
export const createAppointment = mutation({
  args: {
    userId: v.id("users"),
    service: v.string(),
    date: v.string(),
    time: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw Error("Not authenticated");
    }
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


/**
 * Retrieves appointments for a specific user.
 * 
 * @param ctx - The context object.
 * @param args - The arguments containing the user ID.
 * @returns {Promise} A promise that resolves to the appointments for the user.
 */
export const getAppointments = query({
  args: { userId: v.id("users") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("appointments")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});