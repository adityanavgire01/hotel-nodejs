const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get menu items by category (parameterized endpoint)
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        // Validate if the category is valid according to our schema
        const validCategories = ['snacks', 'mainCourse', 'dessert', 'drinks'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category specified' });
        }
        
        const menuItems = await MenuItem.find({ category: category });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get available/unavailable items
router.get('/available/:status', async (req, res) => {
    try {
        const isAvailable = req.params.status === 'true';
        const menuItems = await MenuItem.find({ isAvailable: isAvailable });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new menu item
router.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const savedMenuItems = await MenuItem.insertMany(req.body);
            res.status(201).json(savedMenuItems);
        } else {
            const menuItem = new MenuItem(req.body);
            const savedMenuItem = await menuItem.save();
            res.status(201).json(savedMenuItem);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get menu item by ID
router.get('/id/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update menu item by ID
router.put('/id/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete menu item by ID
router.delete('/id/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;