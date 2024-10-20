/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 10:05:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// components/ErrorToast.tsx
import { useToast } from "@/components/ui/use-toast";

export function useErrorToast() {
    const { toast } = useToast();

    return (error: Error) => {
        console.error(error);
        toast({
            title: "An error occurred",
            description: error.message,
            variant: "destructive",
        });
    };
}