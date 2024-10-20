/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 06:24:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};