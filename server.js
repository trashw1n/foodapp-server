require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/auth");
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');

const notFoundMiddleware = require('./middleware/not-found');

app.use(cors({
  origin: process.env.ORIGIN_HOST, 
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter)
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
};
  
start();