const express =  require('express');
const app = express();
const Msg = require('../model/Msg.js');

app.use(express.json());

exports.writeContent = (req, res, next) => {
    
};