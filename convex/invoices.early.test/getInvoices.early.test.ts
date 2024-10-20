
// Unit tests for: getInvoices


import { _Context } from '../../convex/_generated/server';
import { getInvoices } from '../../convex/invoices';
import { Id } from "../_generated/dataModel";


// __tests__/invoices.test.ts
jest.mock("../../convex/_generated/server", () => ({
  // Mock the database query and collect methods
  _Context: jest.fn().mockImplementation(() => ({
    db: {
      query: jest.fn().mockReturnThis(),
      withIndex: jest.fn().mockReturnThis(),
      collect: jest.fn(),
    },
  })),
}));

describe('getInvoices() getInvoices method', () => {
  let ctx: _Context;
  const userId: Id<'users'> = 'user-123' as Id<'users'>;

  beforeEach(() => {
    ctx = new _Context();
  });

  it('should return invoices for a user with valid appointments', async () => {
    // Mock appointments and invoices
    const appointments = [{ _id: 'appointment-1' }, { _id: 'appointment-2' }];
    const invoices = [
      { appointmentId: 'appointment-1', amount: 100, dueDate: '2024-10-21', status: 'pending' },
      { appointmentId: 'appointment-2', amount: 200, dueDate: '2024-10-22', status: 'pending' },
    ];

    // Mock the database responses
    ctx.db.collect.mockResolvedValueOnce(appointments).mockResolvedValueOnce(invoices);

    const result = await getInvoices.handler(ctx, { userId });

    expect(ctx.db.query).toHaveBeenCalledWith('appointments');
    expect(ctx.db.withIndex).toHaveBeenCalledWith('by_user_id', expect.any(Function));
    expect(ctx.db.collect).toHaveBeenCalledTimes(2);
    expect(result).toEqual(invoices);
  });

  it('should return an empty array if the user has no appointments', async () => {
    // Mock no appointments
    ctx.db.collect.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const result = await getInvoices.handler(ctx, { userId });

    expect(ctx.db.query).toHaveBeenCalledWith('appointments');
    expect(ctx.db.withIndex).toHaveBeenCalledWith('by_user_id', expect.any(Function));
    expect(ctx.db.collect).toHaveBeenCalledTimes(2);
    expect(result).toEqual([]);
  });

  it('should handle errors when querying appointments', async () => {
    // Mock an error during appointments query
    ctx.db.collect.mockRejectedValueOnce(new Error('Database error'));

    await expect(getInvoices.handler(ctx, { userId })).rejects.toThrow('Database error');

    expect(ctx.db.query).toHaveBeenCalledWith('appointments');
    expect(ctx.db.withIndex).toHaveBeenCalledWith('by_user_id', expect.any(Function));
    expect(ctx.db.collect).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when querying invoices', async () => {
    // Mock appointments and an error during invoices query
    const appointments = [{ _id: 'appointment-1' }];
    ctx.db.collect.mockResolvedValueOnce(appointments).mockRejectedValueOnce(new Error('Database error'));

    await expect(getInvoices.handler(ctx, { userId })).rejects.toThrow('Database error');

    expect(ctx.db.query).toHaveBeenCalledWith('appointments');
    expect(ctx.db.withIndex).toHaveBeenCalledWith('by_user_id', expect.any(Function));
    expect(ctx.db.collect).toHaveBeenCalledTimes(2);
  });
});

// End of unit tests for: getInvoices
