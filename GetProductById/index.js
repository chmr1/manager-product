/**
 * Arquivo: GetProductById/index.js
 * Data: 26/09/2020
 * Descrição: arquivo responsável por exibir um Produto pelo Id
 *
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const { id } = req.params;

    if (!id) {
        context.res = { status: 400, body: 'Por favor, informe um Id de Produto válido!' }
        return
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');

    try {
        const body = await Products.findOne({ _id: ObjectID(id) });
        closeConnectionFn();
        context.res = { status: 200, body };
    } catch (error) {
        context.res = { status: 500, body: 'Erro ao exibir Produto pelo Id.' };
    }

}