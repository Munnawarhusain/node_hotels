const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

// This is for menu data ---------
router.post('/', async(req,res) => {
    try{
        const data = req.body;
        const newMenu = new Menu(data);

        const response = await newMenu.save();
        console.log('data saved successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Menu ------
router.get('/', async (req,res) => {
    try{
        const data = await Menu.find();
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:tasteType', async(req,res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await Menu.find({taste:tasteType});
            console.log("response received");
            res.status(200).json(response);
        }
        else{
            console.log("Invalid worktype")
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;