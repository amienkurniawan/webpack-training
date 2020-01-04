const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
})
app.get('/hello-world/', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
})

app.listen(3000, function () {
    console.log('Application Running on https://localhost:3000/')
})