const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const config = require('./config.js');
const {
  validateDate,
  validateCvv,
  validatePanNumber,
  validateLuhnAlgo
} = require('./validate.js');
const app = express();

const port = config.port || 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port);
});

//Make sure requests can be done by 3000 port (frontend)
app.use(cors({ origin: 'http://localhost:3000' }));

//Making json parsing easier for requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


app.post("/validateCard", function(req, res) {

  let expDate = req.body.expDate;
  const year = expDate.split('-')[0];
  const month = expDate.split('-')[1];
  expDate = new Date(year, month, 0);

  let cvvCode = req.body.cvvCode;
  let panNumber = req.body.panNumber;

  //Start from false every validation
  let response = {
    validCard: false,
    expDate: false,
    cvvCode: false,
    panNumber: false,
  };


  //If body request has empty field, return 400 status and a message
  if(!expDate || !cvvCode || !panNumber) {
    res.status(400).send('Please complete all fields');
  }
  
  //Return boolean variables according functions
  response.expDate = validateDate(expDate);
  response.cvvCode = validateCvv(cvvCode,panNumber);
  response.panNumber = validatePanNumber(panNumber) && validateLuhnAlgo(panNumber);
  response.validCard = (response.expDate && response.cvvCode && response.panNumber);

  //Return correct response
  res.status(200).send(response);
  
});



