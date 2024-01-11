const crypto = require('crypto');

function generateKeyAndIV() {
    const key = crypto.randomBytes(32); // 256 bits key
    const iv = crypto.randomBytes(16);  // 128 bits IV
    return { key, iv };
}

const { key, iv } = generateKeyAndIV();

console.log('Key:', key.toString('hex'));
console.log('IV:', iv.toString('hex'));
