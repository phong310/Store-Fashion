const mongoose = require("mongoose")
const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const dotenv = require('dotenv');
const ShoeAll = require('./router/Shoe')
const Clothing = require('./router/Clothing')
const Accessories = require('./router/Accessories')
const Auth = require("./router/Auth")
const Orders = require('./router/Orders')
const Cart = require('./router/Cart')

const app = express();
const PORT = 3001;

dotenv.config()
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT} !`)
})


// ROUTER
app.use('/shoe-collection', ShoeAll);

app.use('/clothing-collection', Clothing);

app.use('/accessories-collection', Accessories)

app.use("/auth", Auth);

app.use("/order", Orders);

app.use("/cart", Cart)



// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('CONNECT TO MONGO DB');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

