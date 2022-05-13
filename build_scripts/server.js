const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
const dbURI = process.env.MONGODB_URI;
/**ROUTES*/
const authRoutes = require('../routes/auth.routes');
const transactionRoutes = require('../routes/transactions.routes');
const operationsRoutes = require('../routes/operations.routes');
/**CONNECT*/
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result => app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })))
  .catch((err) => console.log(err))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send('637 Bank')
});
app.use('/auth',authRoutes);
app.use('/transact', transactionRoutes);
app.use('/operation',operationsRoutes);