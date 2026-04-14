import { createHash } from 'crypto';

// const { createHash } = require('crypto');

const generateChecksum = async (payload, endpoint, SALT_KEY) => {
    const stringToHash = payload + endpoint + SALT_KEY;
    const sha256Value = createHash('sha256').update(stringToHash).digest('hex');
    return `${sha256Value}###1`; // Key index 1
};

export default generateChecksum;