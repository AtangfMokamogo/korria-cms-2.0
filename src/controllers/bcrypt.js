import bcrypt from 'bcrypt';

/**
 * This function hashes an input string using bcrypt
 * @param {String} password A valid password string from client  
 * @returns A bcrypt hash string
 */
export async function hashPassword(password) {
    const hashed = bcrypt.hashSync(password, 10);
    return hashed
}

/**
 * This function decrypts a hashed string
 * @param {String} hashPass A bcrypt hashed string to decipher
 * @returns true for a verified password else false
 */
export async function decryptPassword(hashPass, password) {
    return bcrypt.compareSync(hashPass, password)
}

