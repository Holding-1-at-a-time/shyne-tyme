
// Unit tests for: optimizeAppointments


import { Ollama } from "ollama";
import { optimizeAppointments } from '../../lib/ai';

// __tests__/ai.test.ts


// __tests__/ai.test.ts
// Mock the Ollama class and its generate method
jest.mock("ollama", () => {
  return {
    Ollama: jest.fn().mockImplementation(() => {
      return {
        generate: jest.fn(),
      };
    }),
  };
});

describe('optimizeAppointments() optimizeAppointments method', () => {
  let ollamaInstance: any;

  beforeEach(() => {
    ollamaInstance = new Ollama();
  });

  it('should return optimized appointments for a valid input', async () => {
    // Arrange
    const appointments = [
      { id: 1, duration: 30, location: 'A' },
      { id: 2, duration: 45, location: 'B' },
    ];
    const optimizedAppointments = [
      { id: 2, duration: 45, location: 'B' },
      { id: 1, duration: 30, location: 'A' },
    ];
    ollamaInstance.generate.mockResolvedValueOnce({
      context: JSON.stringify(optimizedAppointments),
    });

    // Act
    const result = await optimizeAppointments(appointments);

    // Assert
    expect(result).toEqual(optimizedAppointments);
    expect(ollamaInstance.generate).toHaveBeenCalledWith({
      model: 'llama3.2:3b',
      prompt: expect.any(String),
    });
  });

  it('should handle an empty appointments array', async () => {
    // Arrange
    const appointments: any[] = [];
    ollamaInstance.generate.mockResolvedValueOnce({
      context: JSON.stringify([]),
    });

    // Act
    const result = await optimizeAppointments(appointments);

    // Assert
    expect(result).toEqual([]);
    expect(ollamaInstance.generate).toHaveBeenCalledWith({
      model: 'llama3.2:3b',
      prompt: expect.any(String),
    });
  });

  it('should throw an error if the response is not valid JSON', async () => {
    // Arrange
    const appointments = [
      { id: 1, duration: 30, location: 'A' },
    ];
    ollamaInstance.generate.mockResolvedValueOnce({
      context: 'invalid JSON',
    });

    // Act & Assert
    await expect(optimizeAppointments(appointments)).rejects.toThrow(SyntaxError);
  });

  it('should throw an error if Ollama service fails', async () => {
    // Arrange
    const appointments = [
      { id: 1, duration: 30, location: 'A' },
    ];
    ollamaInstance.generate.mockRejectedValueOnce(new Error('Service failure'));

    // Act & Assert
    await expect(optimizeAppointments(appointments)).rejects.toThrow('Service failure');
  });
});

// End of unit tests for: optimizeAppointments
