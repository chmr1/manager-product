/**
 * Arquivo: UpdateProduct/index.js
 * Data: 26/09/2020
 * Descrição: arquivo responsável por atualizar um Produto pelo Id
 *
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body || {};

    if (!id || !product) {
        context.res = { status: 400, body: 'Os campos são obrigatórios!' }
        return
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');

    try {
        const products = await Products.findOneAndUpdate({ _id: ObjectID(id) }, { $set: product });
        closeConnectionFn();
        context.res = { status: 201, body: 'Produto atualizado com sucesso!' }
    } catch (error) {
        context.res = { status: 500, body: 'Erro ao atualizar o Produto!' }
    }

}