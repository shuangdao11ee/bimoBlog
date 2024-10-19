const { urlToRequest } = require('loader-utils');
// import { urlToRequest } from 'loader-utils';
const { validate } = require('schema-utils');
// import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

module.exports = function (source, map) {
  const options = this.getOptions();

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options'
  });

  // console.log('The request path', urlToRequest(this.resourcePath));

  // Apply some transformations to the source...

  const returnRes = `export default ${JSON.stringify(source)}`;

  return returnRes;
};
