const express = require('express');
const router =  express.Router();
const Person = require('./../models/person');

// This is for person data -------
router.post('/', async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Person -----
router.get('/', async (req,res) => {
    try{
        const data = await Person.find();
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Person : workType --------
router.get('/:workType',async(req,res) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log("response received");
            res.status(200).json(response);
        }
        else{
            console.log("Invalid worktype");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Method to Update data ------
router.put('/:id', (req,res) => {
    try{
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = Person.findByIdAndUpdate(personId,updatePersonData, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;