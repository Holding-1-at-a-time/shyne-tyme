/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 06:25:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// convex/client.ts
import { ConvexClient } from "convex/browser";
import { api } from "./api";

export const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);