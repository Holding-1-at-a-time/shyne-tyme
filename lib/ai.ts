/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 08:49:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
// lib/ai.ts
import { Ollama } from "ollama";

const ollama = new Ollama();

/**
 * Generate an optimized schedule for a list of appointments.
 * @param appointments An array of appointment objects.
 * @returns A JSON array of optimized appointments.
 */
export async function optimizeAppointments(appointments: any[]) {
  const prompt = `Given the following appointments: ${JSON.stringify(appointments)}, 
    suggest an optimized schedule considering factors like service duration, 
    location, and potential traffic. Provide the output as a JSON array of 
    optimized appointments.`;

  const response = await ollama.generate({
    model: "llama3.2:3b",
    prompt,
  });

  return JSON.parse(response.tex);
}