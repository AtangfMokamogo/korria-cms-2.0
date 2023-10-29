import dotenv from 'dotenv';
import pkg from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

const { sign, verify } = pkg;
dotenv.config();



/**
 * generates a JSON web token
 * @param {Object} fields an object with properties to encrypt
 * @returns a JWT token string 
 */
export async function tokenise(fields) {
    
    return sign(fields, process.env.TOKENIZER_KORRIA, { expiresIn: '24h' });
}

/**
 * verifies an issued token
 * @param {String} token a JWT token string
 * 
 */
export async function verifyToken(token) {
    try{
        const decoded = verify(token, process.env.TOKENIZER_KORRIA);
        return decoded;
    }catch(error){
        if (error.message === 'jwt expired') {
            throw new GraphQLError('Token expired! Please login again.');
          }
          if (error.message === 'invalid signature') {
            throw new GraphQLError('Invalid Token Signature!');
          }
          if (error.message === 'invalid token') {
            throw new GraphQLError('Invalid Token!');
          }
          if (error.message === 'jwt malformed') {
            throw new GraphQLError('Malformed Token! Ensure you pass a JWT');
          }
    }
}