const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  const diagnostics = readFromFile('./db/diagnostics.json');
  res.json(JSON.parse(diagnostics));
  res.sendFile(path.join(__dirname, "./public/404.html"));
});

// POST Route for a error logging
diagnostics.post('/api/diagnostics', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const newDiagnostic = {
    id: uuidv4(),
    ...req.body,
  };
  if ( req.body ) {
    readAndAppend(newDiagnostic, './db/diagnostics.json');
   };
});

module.exports = diagnostics;
