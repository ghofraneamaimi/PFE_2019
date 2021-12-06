const config = require('config.json');
const jwt = require('jsonwebtoken');
const Client = require('../models/client')
const ObjectId = require('mongoose').Types.ObjectId;
// users hardcoded for simplicity, store in a db for production applications
const clients = [{ id: 1,name:'test', username: 'test', password: 'test', phone: 'Test', email: 'User' }];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = clients.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return clients.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}