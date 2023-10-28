import { validateEmail } from '../src/utils/stringValidators.js';

describe('validateEmail', () => {
    it('should return true for a valid email', async () => {
      const email = 'user123@sub.domain.co';
      const result = await validateEmail(email);
      expect(result).toBe(true);
    });
  
  });
