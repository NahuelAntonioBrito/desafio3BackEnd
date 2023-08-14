import ProductManager from './productManager.js';
import express from 'express';

const products = [
    {
        title: 'Producto prueba 1',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc1',
        stock: 25
    },
    {
        title: 'Producto prueba 2',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc12',
        stock: 25
    },
    {
        title: 'Producto prueba 3',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    },
    {
        title: 'Producto prueba 4',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc1234',
        stock: 25
    },
    {
        title: 'Producto prueba 5',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc1235',
        stock: 25,
    }
];

const productManager = new ProductManager('./data/products.json');

// Agrega todos los productos al archivo una vez al inicio
(async () => {
    try {
        for (let i = 0; i < products.length; i++) {
            await productManager.addProduct(products[i]);
        }
    } catch (error) {
        console.error('Error creating archive:', error);
    }
})();

const app = express();

app.get('/', (req, res) => {
    res.send('Esta es Mi App')
})

app.get('/products', async (req, res) => {
    try {
        const productsList = await productManager.getProducts();
        const limit = req.query.limit; // Obtener el valor de "limit" de la consulta
        
        let newList = [];

        // Verificar si el parámetro "limit" es válido y procesar la lista de productos
        if (limit && !isNaN(parseInt(limit))) {
            for (let i = 0; i < Math.min(productsList.length, parseInt(limit)); i++) {
                newList.push(productsList[i]);
            }
        } else {
            // Si "limit" no es válido o no se proporciona, devolver la lista completa
            newList = productsList;
        }

        res.send(newList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const productId = await productManager.getProductById(id);
    if(!productId){
        res.send('No Se Encontro El Producto')
    }else{
        res.send(productId)
    }   
    
})


app.listen(8080, () => console.log('Server up on port 8080'));