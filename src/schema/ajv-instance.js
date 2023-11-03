const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajvInstance = new Ajv({ allErrors: true });
addFormats(ajvInstance);
ajvInstance.addFormat('phoneIR', /^(\+98|0098|98|0)?9\d{9}$/);

module.exports = ajvInstance;
