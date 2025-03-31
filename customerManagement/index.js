const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require("./src/errors/errorHandler.errors");
const dbConnection = require('./src/database/mongoose.database');
const routes = require('./src/routers');
const app = express();

dotenv.config();
dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Customer Management Server is running on port ${process.env.PORT}`);
});