/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 13:06:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/

import { useContext } from "./_generated/server";

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export async function ensureAuthenticated(ctx: useContext): Promise<void> {
  let retryCount = 0;
  const maxRetries = 3;
  
  while (retryCount < maxRetries) {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (identity === null) {
        throw new AuthenticationError("Not authenticated");
      }
      return; // Exit function if successful
    } catch (error) {
      console.error(`Error during identity retrieval: ${error}`);
      retryCount++;
      if (retryCount === maxRetries) {
        throw new AuthenticationError("Authentication failed: Unable to retrieve user identity after multiple retries");
      }
    }
  }
}