const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World dodj!');
});


// Get all products
app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Get single product
app.get('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Create a product
app.post('/api/products', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json({ message: err.message });
    }

});


// Update a product
app.put('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch(err){
        res.status(500).json({ message: err.message });
    }
});


// Delete a product
app.delete('/api/product/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://mdmofazzalhossain:9yDA5U1sP5LMq0Ua@backenddb.ajt3c.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        app.listen(4000, () => {
            console.log('Example app listening on port 4000!');
        });
        console.log('Database Connected');
    })
    .catch((err) => {
        console.log('Database Connection Error:', err);
    });
