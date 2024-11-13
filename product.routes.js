const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// Маршрут для отримання усіх продуктів
router.get('/products', (request, response) => {
    return response.json(products);
});

// Маршрут для отримання продуктів за брендом
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
    const { brand } = request.params;
    const filteredProducts = products.filter(product => product.brand === brand);
    response.json(filteredProducts);
});

// Додатковий маршрут для отримання продукту за id
router.get('/product/:id', (request, response) => {
    const { id } = request.params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return response.status(404).json({ message: 'Продукт з таким ID не знайдено' });
    }

    response.json(product);
});

module.exports = router;
