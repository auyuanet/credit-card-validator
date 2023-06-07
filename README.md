## INTRODUCTION

This project was undertaken to fulfill a credit card validator task. The task involved building an API endpoint to validate a credit card based on certain conditions.

The application was developed using Node.js for the backend and React for the frontend. It's important to note that this project is not hosted on a server, so instructions for execution will be explained below.

An important aspect to mention is that each validation was performed based on the responsibilities assigned to both areas. While many validations can be done from the frontend through API requests, for the purpose of this task, additional validations were implemented on the frontend to complete the app and enhance the user interface.

## INSTRUCTIONS

1. Download the proyect and save it into a folder.
2. Open your system's console.
3. Change directory by doing 'cd [Folder_Name]/CreditCardApp/Backend'
4. Excecute 'node server'.
5. Open another console.
6. Change directory by doing 'cd [Folder_Name]/CreditCardApp/Frontend/credit-card-form'.
7. Excecute 'node start'.

Please be aware that routes may not function properly depending on your current directory.

## API DOCUMENTATION
- Url: 'http://localhost:8000'
- Endpoint: '/validateCard'
- Method: POST
- Headers:
		Content-Type: application/json
- Request Body:
 		{
			"panNumber": "1324132413244", 
			"cvvCode": "1234", 
			"expDate": "2025-20"
		}
		
- Body Parameters  Type
		panNumber: Integer
		cvvCode: Integer
		expDate: String 'yyyy-mm'
		
- Responses: 
 - Empty params: 

	1. Request Body

    		  {
    		  	"panNumber": "", 
    		  	"cvvCode": "", 
    		  	"expDate": ""
    		  }

	1. Response

    		  {
    		  	"status": 400, 
     		  	"message": "Please complete all fields",
    		  }

 - Completed params: 

	1. Request Body

 		{
			"panNumber": "1324132413244", 
			"cvvCode": "1234", 
			"expDate": "2025-20"
		}

	1. Response

    		  {
    		  	"status": 200, 
     		  	"body": {
					"validCard": false,
					"expDate": false,
					"cvvCode": false,
					"panNumber": false
				}
    		  }
			  
  - Response Parameters  Type
		 "validCard": boolean
         "expDate": boolean
         "cvvCode": boolean,
		 "panNumber": boolean

 - **validCard**: Returns true if the card is valid (card number, expiration date, and CVV code).
 - **expDat**:  Returns true if the expiration date is valid.
 - **cvvCode**:   Returns true if the  CVV code is valid.
 - **panNumber**:   Returns true if the card number is valid.


## IMPORTANT POINTS
- Some validations, although implemented, are not displayed in the user interface in order to provide specific error information to the user. This decision was made due to the context of the task being a credit card validator. For example, the Luhn algorithm is not something that needs to be explicitly communicated to the user when the credit card number is invalid. In conclusion, the user is informed about the incorrect fields but unnecessary details about backend validations are not provided

- Another important point is that there are other things like the .env file that may not be necessary for this project. In a normal situation, it wouldn't be uploaded to this repository. However, the intention was to showcase alternative ways of working.
