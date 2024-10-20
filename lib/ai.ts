/**
    * @description      : 
    * @author           : Owner
    * @group            : 
    * @created          : 20/10/2024 - 11:19:40
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/10/2024
    * - Author          : Owner
    * - Modification    : 
**/
import { Ollama } from "ollama";
import { TimeoutError } from 'node:errors';
import { Error } from 'global';
import { Appointment } from "@/types/appointmentsTypes";

const ollama = new Ollama();

function validateAppointments(appointments: unknown): asserts appointments is Appointment[] {
  if (!Array.isArray(appointments) || appointments.some(appointments => typeof appointments !== 'object')) {
    throw new Error('Invalid appointments data');
  }
};

export async function optimizeAppointments(appointments: Omit<Appointment, 'contactNumber' | 'vehicleId' | 'vehicleVIN' | 'vehicleLicensePlate' | 'vehicleBodyType'>[
]) {
  if (!Array.isArray(appointments) || appointments.some(appointments => typeof appointments !== 'object')) {
    throw new Error('Appointments data is invalid. Please provide an array of valid appointment objects.');
  }
  const ollama = new Ollama();
  const sanitizedAppointments = appointments.map(({ serviceDuration, location, clientName, appointmentDate, isConfirmed, serviceType, notes, isCancelled, serviceId, userId, id, createdAt, updatedAt, deletedAt, vehicleId, vehiclePlate, vehicleMake, vehicleModel, vehicleColor, vehicleYear }) => ({
    serviceDuration, location, clientName, appointmentDate, isConfirmed, serviceType, notes, isCancelled, serviceId, userId, id, createdAt, updatedAt, deletedAt, vehicleId, vehiclePlate, vehicleMake, vehicleModel, vehicleColor, vehicleYear
  }));
  try {
    const prompt = `Given the following appointments: ${JSON.stringify(sanitizedAppointments, null, 2)}, 
        suggest an optimized schedule considering factors like service duration, 
        location, and potential traffic. Provide the output as a JSON array of 
        optimized appointments.`;
  } catch (error) {
    console.error('Error during JSON.stringify operation:', error);
    throw error;
  }

  validateAppointments(appointments);


  const controller = new AbortController();
  const signal = controller;

  try {
    const response = await Promise.race([
      ollama.generate({
        model: "llama3.2:3b",
        prompt,
        signal
      }).catch((error) => {
        throw new Error(`Error in ollama.generate: ${error.message}`);
      }),
      new Promise((_, reject) => setTimeout(() => {
        controller.abort();
        reject(new TimeoutError('Timeout'));
      }, 5000))
    ]);

    if (response instanceof Error) {
      throw new TimeoutError('Timeout error: External service did not respond in time.');
    }

    if (response instanceof Object && 'context' in response) {
      try {
        return JSON.parse(response.context as string);
      } catch (error) {
        throw new Error('Invalid response');
      }
    } else {
      throw new Error('Invalid response');
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      throw error;
    }
    if (error instanceof Error) {
      console.error(`Error in optimizeAppointments: ${error.message}`);
      console.error(error.stack);
    } else {
      console.error(`Unknown error: ${error}`);
    }
  }
}