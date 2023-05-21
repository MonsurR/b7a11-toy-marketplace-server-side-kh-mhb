const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const categories = require('./data/categories.json');

app.get('/', (req, res) => {
    res.send('Baby Corner Shop')
});
app.get('/categories', (req, res) => {
    res.send(categories);
})



app.listen(port, () => {
    console.log(`Baby Corner Shop  Crud on ${port}`)
})