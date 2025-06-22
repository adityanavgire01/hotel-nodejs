const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true, 
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String, 
        enum: ['snacks', 'mainCourse', 'dessert', 'drinks'],
        required: true
    },
    isAvailable: {
        type: Boolean, 
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;