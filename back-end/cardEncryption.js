const crypto = require('crypto');

// Get the secret key from environment variables
const secretKey = process.env.CRYPTO_SECRET_KEY;

// Function to encrypt the card number
const encryptCardNumber = (cardNumber) => {
    const cipher = crypto.createCipher('aes-256-ctr', secretKey);
    let encryptedCardNumber = cipher.update(cardNumber, 'utf-8', 'hex');
    encryptedCardNumber += cipher.final('hex');
    return encryptedCardNumber;
};

// Function to decrypt the card number
const decryptCardNumber = (encryptedCardNumber) => {
    const decipher = crypto.createDecipher('aes-256-ctr', secretKey);
    let decryptedCardNumber = decipher.update(encryptedCardNumber, 'hex', 'utf-8');
    decryptedCardNumber += decipher.final('utf-8');
    return decryptedCardNumber;
};

module.exports = {
    encryptCardNumber,
    decryptCardNumber,
};