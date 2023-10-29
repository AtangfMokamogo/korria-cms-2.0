// Import necessary modules and libraries
require('dotenv').config();
import { tokenise, verifyToken } from '../src/controllers/jwt.js';
import JsonWebToken from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

// Mock process.env
process.env.TOKENIZER_KORRIA = '248a4e72-7648-11ee-b962-0242ac120002';

// Mock JsonWebToken sign and verify methods
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('tokenise', () => {
  it('should generate a JWT token', async () => {
    // Arrange
    const fields = { 
        fullname: 'fino',
        email: 'fino@email.com',
    };

    // Act
    await tokenise(fields);

    // Assert
    expect(JsonWebToken.sign).toHaveBeenCalledWith(fields, process.env.TOKENIZER_KORRIA, { expiresIn: '24h' });
  });
});

describe('verifyToken', () => {
  it('should verify a valid token', async () => {
    // Arrange
    const token = 'valid_token';
    const decodedToken = { /* your decoded token here */ };
    JsonWebToken.verify.mockReturnValue(decodedToken);

    // Act
    const result = await verifyToken(token);

    // Assert
    expect(result).toEqual(decodedToken);
  });

  it('should handle token expiration error', async () => {
    // Arrange
    const token = 'expired_token';
    JsonWebToken.verify.mockImplementation(() => {
      throw new Error('jwt expired');
    });

    // Act and Assert
    await expect(verifyToken(token)).rejects.toThrow(GraphQLError);
    // Make sure to handle the specific error message within your application
  });

  // Add similar tests for other error scenarios
});
