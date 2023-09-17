const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use('/', express.static('public'));

const budget = [];

fs.readFile('budget.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        budgetData = JSON.parse(data);
    }
});

app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

app.get('/budget', (req,res) => {
    res.json(budgetData);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
});