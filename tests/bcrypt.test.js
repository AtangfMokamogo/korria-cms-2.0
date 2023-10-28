import { hashPassword } from "../src/controllers/bcrypt";
import bcrypt from 'bcrypt';

describe('Testing bcrypt hashing module', () => {
    describe('hashPassword', () => {
        it('should hash a password correctly', async () => {
          const password = 'mySecurePassword';
          const hashedPassword = await hashPassword(password);
      
          // Compare the hashed password with the expected hash using bcrypt.compareSync
          const isMatch = bcrypt.compareSync(password, hashedPassword);
      
          // Assert that the hashes match
          expect(isMatch).toBe(true);
        });
      
        // Add more test cases if needed
      });
})