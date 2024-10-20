/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 14:24:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// app/customers/page.tsx
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useErrorToast } from "@/components/ErrorToast";
import { Id } from "@/convex/_generated/dataModel";

export default function Customers() {
    const { user } = useUser();
    const customers = useQuery(api.customers.getCustomers, {
        userId: user?.id as Id<'users',
    });
    const addCustomer = useMutation(api.customers.addCustomer);
    const showError = useErrorToast();

    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        vehicleDetails: "",
    });

    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addCustomer({
                userId: user?.id as Id<'users'>,
                ...newCustomer,
                preferences: [],
            });
            setNewCustomer({ name: "", email: "", phone: "", vehicleDetails: "" });
        } catch (error) {
            showError(error as Error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
            <form onSubmit={handleAddCustomer} className="mb-4">
                <Input
                    type="text"
                    placeholder="Name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="tel"
                    placeholder="Phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="mb-2"
                />
                <Input
                    type="text"
                    placeholder="Vehicle Details"
                    value={newCustomer.vehicleDetails}
                    onChange={(e) => setNewCustomer({ ...newCustomer, vehicleDetails: e.target.value })}
                    className="mb-2"
                />
                <Button type="submit">Add Customer</Button>
            </form>
            <div>
                {customers?.map((customer) => (
                    <div key={customer._id} className="bg-white p-4 rounded shadow mb-2">
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p>{customer.email}</p>
                        <p>{customer.phone}</p>
                        <p>Vehicle: {customer.vehicleDetails}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}