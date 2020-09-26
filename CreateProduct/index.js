/**
 * Arquivo: CreateProduct/index.js
 * Data: 26/09/2020
 * Descrição: arquivo responsável por criar um novo 'Produto'
 *
 */

const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const product = req.body || {};

    if (product) {
        context.res = { status: 400, body: 'Os dados do Produto são obrigatórios!' }
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();    
    const Products = MongoClient.collection('products');
    
    try {
        const res = await Products.insertOne(product);
        closeConnectionFn();
        context.res = { status: 201, body: 'Produto inserido com sucesso!' }
    } catch (error) {
        context.res = { status: 500, body: 'Erro ao cadastrar o Produto!' }
    }
    
}