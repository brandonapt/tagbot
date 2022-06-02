const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
dotenv.config();

const url = process.env.db;

mongoose.connect(url)

const Tag = new mongoose.Schema({
    name: String,
    text: String,
    createdAt: Date,
});

module.exports.server = mongoose.model('Server', {
    id: String,
    tags: [Tag],
});
    

module.exports.tag = Tag;