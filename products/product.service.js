/**
 * Product service: You can define product releted code here
 */
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(UserId) {
    return await db.Product.findAll({
        where: {
            UserId: UserId
        }
    });
}

async function getById(id, UserId) {
    return await getProduct(id, UserId);
}

async function create(params, UserId) {
    // Assign UserId to Product data
    Object.assign(params, { UserId: UserId });

    // create product
    await db.Product.create(params);
}

async function update(id, params, UserId) {
    const product = await getProduct(id, UserId);

    // copy params to product and save
    Object.assign(product, params);
    await product.save();

    return product.get();
}

async function _delete(id, UserId) {
    const product = await getProduct(id, UserId);
    await product.destroy();
}

// helper functions

async function getProduct(id, UserId) {
    const product = await db.Product.findByPk(id);
    if (!product || product.UserId != UserId) throw 'Product not found';
    return product;
}
