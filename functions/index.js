const exampleFunction = require('./examples/exampleFunction');
const ingestCSV = require('./ingestion/ingestCSV');

/*
 * To add a new function take a look at how `exampleFunction` is created and exported.
 */

module.exports = {
  'exampleFunction': exampleFunction,
  'ingestCSV': ingestCSV
};
