const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    phone: {
        type: String, 
        required: true, 
    },
    role: {
        type: String, 
        enum: ['customer', 'chef', 'waiter', 'manager'],
        default: 'customer'
    },
    address: {
        street: String, 
        city: String, 
        state: String, 
        zipCode: String
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;