require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT;

const rfidController = require('./controllers/rfidController');
const userController = require('./controllers/userController');

app.use(express.json());

// RFID data handling endpoint                                                                                                                           
app.post('/rfid', rfidController.readRFID);

// User management endpoints                                                                                                                             
app.post('/users', userController.createUser);
app.get('/users', userController.getUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
