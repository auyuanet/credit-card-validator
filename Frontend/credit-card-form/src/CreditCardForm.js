import React, { useState } from 'react';
import './CreditCardForm.css';
import loaderGif from './media/loader.gif';

const URL_VALIDATE_POST = 'http://localhost:8000';
const ENDPOINT = '/validateCard';

const CreditCardForm = () => {

  const [card, setCard] = useState({
    expDate: false,
    cvvCode: false,
    panNumber: false,
  })

  const [errorMsg, setErrorMsg] = useState({
    status: 'ERROR',
    general: '',
    panNumber: '',
    cvvCode: '',
    expDate: '',
    general: ''
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCard((fields) => ({
      ...fields,
      [id]: value
    }));
  };

  const handleSubmit =  async(event) => {
    event.preventDefault();
    
    setErrorMsg({
      status: 'ERROR',
      general: '',
      panNumber: '',
      cvvCode: '',
      expDate: '',
      general: ''
    });
    
    // Accede a los valores de los campos
    const panNumber = card.panNumber;
    const cvvCode = card.cvvCode;
    const expDate = `${card.expYear}-${card.expMonth}`;
    //let message = '';
    let newErrors = {}

    const cardData = {
      panNumber,
      cvvCode,
      expDate
    };
    console.log(cardData);
    
    //debugger;
    //validate empty fields
    if(!panNumber || !cvvCode || !card.expYear || !card.expMonth) {
      newErrors.general = 'Please complete all fields';
    }else {
      //debugger;
      //Length validations
      if(panNumber.length<16) {
        newErrors.panNumber = 'The card number must be between 16 and 19 characters.';
      }
      if(card.expYear.length!=4) {
        newErrors.expDate = 'Expiration year must be 4 characters long.';
      } 
      if(Number(card.expYear)>=2200) {
        newErrors.expDate = 'Expiration year must be before 2200.';
      }  
      if(Number(card.expMonth)>12 || Number(card.expMonth)<0) {
        newErrors.expDate = 'Expiration month must be a number between 1 and 12.'; 
      } 
    }
    if(newErrors.panNumber || newErrors.cvvCode || newErrors.expDate || newErrors.general) {
      setErrorMsg((errors) => ({
        ...errors,
        ...newErrors
      }));
    }else {
      setLoading(true);

      // Simulating an asynchronous request
  
      await fetch(`${URL_VALIDATE_POST}${ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      })
      .then(response => response.json())
      .then(data => {
        //debugger;
        console.log(data);
        if(data.validCard){
          newErrors.general = 'Valid Card!' 
          newErrors.status = 'SUCCESS';
        }else {
          newErrors.general = 'Invalid Card!' 
          if (!data.expDate) newErrors.expDate = 'Invalid date';
          if (!data.cvvCode) newErrors.cvvCode = 'Invalid Cvv Code';
          if (!data.panNumber) newErrors.panNumber = 'Invalid Card number';
        }
        setErrorMsg((errors) => ({
          ...errors,
          ...newErrors
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
    }
    return;

};


  return (
    <div className="card">
  <form>
      <article className="input-container panNumber">
          <label htmlFor="panNumber">Card Number</label>
          <input
              type="number"
              name="panNumber"
              id="panNumber"
              min="1"
              maxLength="19"
              className={errorMsg.panNumber ? 'invalid-field' : 'form-field'}
              onChange={handleChange}
          />
        <p className='errorMsg'>{errorMsg.panNumber}</p>
      </article>
      <article className="input-container cvvCode">
          <label htmlFor="cvvCode">CVV Code</label>
          <input
              type="number"
              name="cvvCode"
              id="cvvCode"
              min="1"
              maxLength="4"
              className={errorMsg.cvvCode ? 'invalid-field' : 'form-field'}
              onChange={handleChange}
          />
        <p className='errorMsg'>{errorMsg.cvvCode}</p>
          
      </article>
      <article className="input-container date">
          <label htmlFor="expMonth">Expiracy Date</label>
          <input
              placeholder='MM'
              type="number"
              name="expMonth"
              id="expMonth"
              min="1"
              max="12"
              maxLength="2"
              className={errorMsg.expDate ? 'invalid-field' : 'form-field'}
              onChange={handleChange}
          />
          <input
              placeholder='YYYY'
              type="number"
              name="expYear"
              id="expYear"
              min="1"
              maxLength="4"
              className={errorMsg.expDate ? 'invalid-field' : 'form-field'}
              onChange={handleChange}

          />
        <p className='errorMsg'>{errorMsg.expDate}</p>
      </article>
      <p className={errorMsg.status == 'ERROR' ? 'errorMsg' : 'successMsg'}>{errorMsg.general}</p>
      <button onClick={handleSubmit}type="button" className="btnCheck">Check Card</button>
      <div className="loader">
      {loading ? (
          <img src={loaderGif} alt="Loading..." />
        ) : <div></div>
      }
      </div>
  </form>
  </div>
  )
}
export default CreditCardForm 
