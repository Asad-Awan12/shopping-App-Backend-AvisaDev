import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser';

const  app = express();
app.use(cors())

// app.use(cors({
//     origin:process.env.ORIGIN,
//     credentials:true,            //access-control-allow-credentials:true
//     // optionSuccessStatus:200
// }))
app.use(express.json({limit:'16kb'}));
// app.use(ex?.json());

app.use(express.urlencoded({limit:'16kb',extended:true}));
app.use(express.static('public/temp'));
app.use(cookieParser());


// routes
import { router } from './Routes/user.route.js';
import { Todorouter } from './Routes/todo.route.js';
import { prefRouter } from './Routes/pref.route.js';
import { shopRouter } from './Routes/shop.route.js';
import { productRouter } from './Routes/product.route.js';
import { reviewRouter } from './Routes/review.route.js';
import { orderRouter } from './Routes/order.route.js';
app.use('/api/v1/user',router);
app.use('/api/v1/todo',Todorouter);
app.use('/api/v1/pref',prefRouter);
app.use('/api/v1/shop',shopRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/review',reviewRouter);
app.use('/api/v1/order',orderRouter);

// http://localhost:8000//api/v1/user
export{
    app
}
