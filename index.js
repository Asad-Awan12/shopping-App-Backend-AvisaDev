import connectDB from './db/index.js'
import dotenv from 'dotenv';
import { app } from './app.js';
dotenv.config({
    path:'./.env'
})
console.log(process.env.PORT);

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is Running on port : ${process.env.PORT}`)
      })
      app.on('errror',(error)=>{
        console.log("error in port ",error);
        
      })
}).catch((error)=>{
    console.log('errror ',error); 
})