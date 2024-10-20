/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 06:25:15
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  appointments: defineTable({
    userId: v.id("users"),
    service: v.string(),
    date: v.string(),
    time: v.string(),
    status: v.string(),
  }).index("by_user_id", ["userId"]),

  customers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    preferences: v.array(v.string()),
    vehicleDetails: v.string(),
  }).index("by_user_id", ["userId"]),

  invoices: defineTable({
    appointmentId: v.id("appointments"),
    amount: v.number(),
    status: v.string(),
    dueDate: v.string(),
  }).index("by_appointment_id", ["appointmentId"]),
});