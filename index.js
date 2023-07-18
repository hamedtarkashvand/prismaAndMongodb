const cookieParser = require('cookie-parser')
const express = require('express');
const userRoute = require('./routes/userRoutes');

const app = express();
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookie middleware
app.use(cookieParser())
app.use('/api' , userRoute)

app.get('/', (req, res) => {
  res.send('Hi from youtube live');
});

app.listen(3000, () => {
  console.log('server is runing on port 3000');
});
