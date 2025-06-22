const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// get all persons
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// get persons by role (parameterized endpoints)
router.get('/:role', async (req, res) => {
    try {
        const role = req.params.role;
        const validRoles = ['customer', 'chef', 'waiter', 'manager'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({message: 'Invalid role'});
        } 
        const persons = await Person.find({role: role});
        res.json(persons);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// create a new person
router.post('/', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const savedPersons = await Person.insertMany(req.body);
            res.status(201).json(savedPersons);
        } else {
            const person = new Person(req.body);
            const savedPerson = await person.save();
            res.status(201).json(savedPerson);
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// get person by ID
router.get('/id/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({message: 'Person not found'});
        }
        res.json(person);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// update person by ID
router.put('/id/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }

        );
        if (!person) {
            return res.status(404).json({message: 'Person not found' });
        }
        res.json(person);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete person by ID
router.delete('/id/:id', async (req,res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({message: 'Person not found'});
        }
        res.json({message: 'Person deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;


