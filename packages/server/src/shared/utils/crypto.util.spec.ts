import { hashPassword, comparePasswords } from './crypto.util';

describe('Crypto Util', () => {
  const password = 'testPassword';
  let hashedPassword: string;

  it('should hash a password', async () => {
    hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it('should compare passwords successfully', async () => {
    const isMatch = await comparePasswords(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should fail to compare passwords with incorrect password', async () => {
    const isMatch = await comparePasswords('wrongPassword', hashedPassword);
    expect(isMatch).toBe(false);
  });
});
