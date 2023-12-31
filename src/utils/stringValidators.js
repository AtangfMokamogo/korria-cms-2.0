/**
 * 
 * @param {String} email Supply the client email
 * 
 */
export function validateEmail(email){
    const validEmailStructure = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return validEmailStructure.test(email);
}