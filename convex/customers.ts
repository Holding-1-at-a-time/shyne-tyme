/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 14:25:30
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// convex/customers.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ensureAuthenticated } from "./auth";

export const addCustomer = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    vehicleDetails: v.string(),
    preferences: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ensureAuthenticated(ctx);
    return await ctx.db.insert("customers", args);
  },
});

export const getCustomers = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    await ensureAuthenticated(ctx);
    return await ctx.db
      .query("customers")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .collect();
  },
});