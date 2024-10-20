
// Unit tests for: optimizeAppointments


import { Error } from 'global';
import { TimeoutError } from 'node:errors';
import { Ollama } from "ollama";
import { optimizeAppointments } from '../ai';

// __tests__/optimizeAppointments.test.ts


// __tests__/optimizeAppointments.test.ts
// Mock classes
class MockOllama {
  generate = jest.fn();
}

describe('optimizeAppointments() optimizeAppointments method', () => {
  let mockOllama: MockOllama;

  beforeEach(() => {
    mockOllama = new MockOllama();
    jest.spyOn(Ollama.prototype, 'generate').mockImplementation(mockOllama.generate as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if appointments is not an array', async () => {
    await expect(optimizeAppointments(null as any)).rejects.toThrow('Appointments data is invalid. Please provide an array of valid appointment objects.');
  });

  it('should throw an error if any appointment is not an object', async () => {
    await expect(optimizeAppointments([null] as any)).rejects.toThrow('Appointments data is invalid. Please provide an array of valid appointment objects.');
  });

  it('should handle a successful response from Ollama', async () => {
    const mockAppointments = [
      {
        serviceDuration: 60,
        location: 'Location A',
        clientName: 'Client A',
        appointmentDate: new Date(),
        isConfirmed: true,
        serviceType: 'Type A',
        notes: 'Notes A',
        isCancelled: false,
        serviceId: 'service1',
        userId: 'user1',
        id: 'id1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        vehicleId: 'vehicle1',
        vehiclePlate: 'plate1',
        vehicleMake: 'make1',
        vehicleModel: 'model1',
        vehicleColor: 'color1',
        vehicleYear: 2020,
      },
    ];

    const mockResponse = {
      context: JSON.stringify([{ ...mockAppointments[0], optimized: true }]),
    };

    mockOllama.generate.mockResolvedValue(mockResponse as any as never);

    const result = await optimizeAppointments(mockAppointments as any);
    expect(result).toEqual([{ ...mockAppointments[0], optimized: true }]);
  });

  it('should throw a TimeoutError if Ollama does not respond in time', async () => {
    mockOllama.generate.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 6000)) as any);

    await expect(optimizeAppointments([] as any)).rejects.toThrow(TimeoutError);
  });

  it('should throw an error if Ollama returns an invalid response', async () => {
    const mockResponse = { context: 'invalid json' };
    mockOllama.generate.mockResolvedValue(mockResponse as any as never);

    await expect(optimizeAppointments([] as any)).rejects.toThrow('Invalid response');
  });

  it('should log an error if an unknown error occurs', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockOllama.generate.mockRejectedValue(new Error('Unknown error') as never);

    await expect(optimizeAppointments([] as any)).rejects.toThrow('Unknown error');
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error in optimizeAppointments:'));
    consoleErrorSpy.mockRestore();
  });
});

// End of unit tests for: optimizeAppointments
