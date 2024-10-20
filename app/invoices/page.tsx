/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 17:28:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// app/invoices/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useErrorToast } from "@/components/ErrorToast";

export default function Invoices() {
    const { user } = useUser();
    const invoices = useQuery(api.invoices.getInvoices, {
        userId: user?.id as string,
    });
    const markAsPaid = useMutation(api.invoices.markAsPaid);
    const showError = useErrorToast();

    const handleMarkAsPaid = async (invoiceId: string) => {
        try {
            await markAsPaid({ invoiceId });
        } catch (error) {
            showError(error as Error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Invoices</h1>
            <div>
                {invoices?.map((invoice) => (
                    <div key={invoice._id} className="bg-white p-4 rounded shadow mb-2">
                        <h3 className="font-semibold">Invoice #{invoice._id}</h3>
                        <p>Amount: ${invoice.amount}</p>
                        <p>Status: {invoice.status}</p>
                        <p>Due Date: {invoice.dueDate}</p>
                        {invoice.status !== "paid" && (
                            <Button onClick={() => handleMarkAsPaid(invoice._id)}>Mark as Paid</Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}