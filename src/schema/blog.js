const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    slug: { type: 'string' },
    banner: { type: 'string' },
    body: { type: 'string' },
    author: { type: 'string' },
  },
  required: ['title', 'slug', 'body'],
};

module.exports = ajvInstance.compile(schema);
