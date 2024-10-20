/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 17:29:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// convex/invoices.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ensureAuthenticated } from "./auth";
import { Id } from "./_generated/dataModel";

export const createInvoice = mutation({
  args: {
    appointmentId: v.id("appointments"),
    amount: v.number(),
    dueDate: v.string(),
  },
  handler: async (ctx, { appointmentId, amount, dueDate }) => {
    await ensureAuthenticated(ctx);
    const invoice = { appointmentId, amount, dueDate, status: "pending" };
    return await ctx.db.insert("invoices", invoice);
  },
});

export const getInvoices = query({
  args: { userId: v.id("users") },
  handler: async (
    ctx: _Context,
    { userId }: { userId: Id<"users"> }
  ): Promise<DbData<"invoices">[]> => {
    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_user_id", (q: { eq: (arg0: string, arg1: Id<"users">) => any; }) => q.eq("userId", userId))
      .collect();

    const appointmentIds = appointments.map((appointment: { _id: any; }) => appointment._id);

    const filter = appointmentIds.reduce(
      (account: { or: (arg0: (q: any) => any) => any; }, id: any) => account.or((q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("appointmentId"), id)),
      (q: { eq: (arg0: any, arg1: any) => any; field: (arg0: string) => any; }) => q.eq(q.field("appointmentId"), appointmentIds[0])
    );

    return await ctx.db
      .query("invoices")
      .filter(filter)
      .collect();
  },
});
export const markAsPaid = mutation({
  args: { 
    invoiceId: v.id("invoices"),
},
  handler: async (ctx, args) => {
    await ensureAuthenticated(ctx);
    await ctx.db.patch(args.invoiceId, { status: "paid" });
  },
});