/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 06:28:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// app/dashboard/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function Dashboard() {
    const { user } = useUser();
    const appointments = useQuery(api.appointments.getAppointments, {
        userId: user?.id as string,
    });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
                    {appointments?.map((appointment) => (
                        <div key={appointment._id} className="bg-white p-4 rounded shadow mb-2">
                            <p>{appointment.service}</p>
                            <p>{appointment.date} at {appointment.time}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Calendar</h2>
                    <Calendar />
                </div>
            </div>
            <Button className="mt-4">New Appointment</Button>
        </div>
    );
}