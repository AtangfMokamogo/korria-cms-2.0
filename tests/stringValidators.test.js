import { validateEmail } from '../src/utils/stringValidators.js';

describe('validateEmail', () => {
    it('should return true for a valid email', async () => {
      const validEmails = [
        'test@example.com',
        'john.doe123@gmail.com',
        'user123@sub.domain.co',
      ];
  
      validEmails.forEach(async (email) => {
        const result = await validateEmail(email);
        expect(result).toBe(true, `Failed for email: ${email}. Result: ${result}`);
      });
    });
    it('should return false for an invalid email', async () => {
      const invalidEmails = [
        'invalidEmail',
        'missing@dot',
        'spaces @ example.com',
        'user@noTopLevelDomain.',
        'user@.missingTopLevelDomain',
      ];
  
      invalidEmails.forEach(async (email) => {
        const result = await validateEmail(email);
        expect(result).toBe(false, `Failed for email: ${email}. Result: ${result}`);
      });
    });
  
    it('should return false for empty or undefined email', async () => {
      const emptyEmail = '';
      const undefinedEmail = undefined;
  
      expect(await validateEmail(emptyEmail)).toBe(false, `Failed for empty email. Result: ${await validateEmail(emptyEmail)}`);
      expect(await validateEmail(undefinedEmail)).toBe(false, `Failed for undefined email. Result: ${await validateEmail(undefinedEmail)}`);
    });
});
