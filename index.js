const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const categories = require('./data/categories.json');
const car = require('./data/car.json');

// app.get('/', (req, res) => {
//     res.send('Baby Corner Shop')
// });
// app.get('/categories', (req, res) => {
//     res.send(categories);
// })
// app.get('/car', (req, res) => {
//     res.send(car);

// })
// app.get('/car/:id', (req, res) => {
//     const id = req.params.id;

//     const selectedCar = car.find(n => n._id === id);
//     res.send(selectedCar);
// });
// app.get('/categories/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     if (id === 0) {
//         res.send(car);
//     }
//     else {
//         const categoryCar = car.filter(n => parseInt(n.category_id) === id);

//         res.send(categoryCar);

//     }

// });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://mahmudulhasanw3b:${process.env.MONGO_PASSWORD}@cluster0.skf8emk.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Baby Corner Shop  Crud on ${port}`)
})