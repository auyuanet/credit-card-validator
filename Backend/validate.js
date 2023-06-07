  const PAN_START_AMEX = ['34','37']
  const CVV_LENGTH = 3;
  const CVV_LENGTH_AMEX = 4;
  const PAN_MIN_LENGTH = 16;
  const PAN_MAX_LENGTH = 19;
  
  const validateDate = (date) => {
    console.log(date)
    let today = new Date();
    let valid = false;

    //From this month (this year) return valid cards
    if (today.getFullYear()<date.getFullYear()
      || (today.getFullYear()==date.getFullYear() && today.getMonth()<=date.getMonth())) {
        valid = true;
    }
    return valid;
  }
  
  const validateCvv = (cvv,pan) => {
    let valid = false;
    let panStart = pan.substring(0,2);
    let AMEX = PAN_START_AMEX.includes(panStart);
  
    //Length for common cards and for American Express
    if((cvv.length == CVV_LENGTH && !AMEX) || (cvv.length == CVV_LENGTH_AMEX && AMEX)){
      valid = true;
    }
  
    return valid;
  }
  
  const validatePanNumber = (pan) => {
    //Between 16 and 19 characters
    let valid = false;
    if(pan.length >= PAN_MIN_LENGTH && pan.length <= PAN_MAX_LENGTH){
  
      valid = true;
    }
    return valid;
  }
  
  const validateLuhnAlgo = (pan) => {
    //Reverse the string to start from right
    pan = pan.replaceAll(' ','');
    pan = pan.split('').reverse().join('');

    let finalValue = 0;
    for(let i=0; i<pan.length; i++){
      let digit = Number(pan.charAt(i));

      //Odd positions are doubled, splited by digits and then the first and second digit addition. 
      if(i%2!=0){
        digit*=2;
        if(digit>=10){
          digit = parseInt(digit/10) + digit%10;
        }
      }
      //Add the number to the total
      finalValue += digit;
    }
    //Verify if last digit is correct
    let valid = (finalValue%10 == 0 ? true : false);
    return valid;
  }

  module.exports = {
    validateDate,
    validateCvv,
    validatePanNumber,
    validateLuhnAlgo
  };