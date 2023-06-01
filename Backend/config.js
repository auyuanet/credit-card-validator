require('dotenv').config();
//In case you work with more than one file make sure you let .env file  out of folders 
//that its a benefit but also means you will need to selec the path of .env file
//require('dotenv').config({path: '/env'});

const config = {  
   port: process.env.PORT,
};

console.log(config);
module.exports = config;
