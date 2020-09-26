/**
 * Arquivo: DeleteProduct/index.js
 * Data: 26/09/2020
 * Descrição: arquivo responsável excluir um Produto pelo Id
 *
 */

const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const { id } = req.params;

    if (!id) {
        context.res = { status: 400, body: 'Por favor, campo obrigatório!' }
        return
    }

    const { client: MongoClient, closeConnectionFn } = await createMongoClient();
    const Products = MongoClient.collection('products');

    try {
        await Products.findOneAndDelete({ _id: ObjectID(id) });
        closeConnectionFn();
        context.res = { status: 200, body: 'Produto excluído com sucesso!' }
    } catch (error) {
        context.res = { status: 500, body: `Erro ao excluir Produto: ${id}` }
    }
    
}