const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    firstname: { type: 'string', minLength: 3 },
    lastname: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 },
    number: { type: 'string', format: 'phoneIR' },
  },
  required: ['firstname', 'lastname', 'email', 'password', 'number']
};

module.exports = ajvInstance.compile(schema);
