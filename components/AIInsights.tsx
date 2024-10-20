/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 17:29:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// components/AIInsights.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { optimizeAppointments } from "@/lib/ai";
import { useErrorToast } from "@/components/ErrorToast";

export function AIInsights() {
    const { user } = useUser();
    const appointments = useQuery(api.appointments.getAppointments, {
        userId: user?.id as string,
    });
    const [insights, setInsights] = useState<string[]>([]);
    const showError = useErrorToast();

    useEffect(() => {
        if (appointments) {
            optimizeAppointments(appointments)
                .then((optimizedAppointments) => {
                    const newInsights = [
                        "Optimized schedule created based on service duration and location.",
                        "Potential upsell opportunity: Offer interior detailing to customers who frequently book exterior services.",
                        "Consider offering a loyalty discount to customers with more than 5 bookings.",
                    ];
                    setInsights(newInsights);
                })
                .catch((error) => {
                    showError(error as Error);
                });
        }
    }, [appointments]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Driven Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc pl-5">
                    {insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}