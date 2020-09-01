/**
 * Product Controller: You can define product releted API calls here
 */
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const productService = require('./product.service');

// routes
router.post('/', authorize(), createSchema, create);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
        category: Joi.string(),
        image: Joi.string()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    productService.create(req.body, req.user.id)
        .then(() => res.json({ message: 'Product added successfully' }))
        .catch(next);
}

function getAll(req, res, next) {
    productService.getAll(req.user.id)
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id, req.user.id)
        .then(product => res.json(product))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        price: Joi.number(),
        description: Joi.string().empty(''),
        category: Joi.string().empty(''),
        image: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body, req.user.id)
        .then(product => res.json(product))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id, req.user.id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}