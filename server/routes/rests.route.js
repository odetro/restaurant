const { json } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { restModel } = require('../models/rest.model');

router.put("/:id", async (req, res) => {
    let body = req.body;
    const doc = await restModel
        .findOneAndUpdate(
            {_id: req.params.id},
            {...body},
            {
                useFindAndModify: false,
                returnOriginal: false
            }
        )
    .exec();
    res.json(doc);
});

router.get("/:rest", async (req, res) => { 
    const docs = await restModel
        .find({"name": req.params.rest})
        .exec();
    res.json(docs);
});

router.get("/", async (req, res) => { 
    const docs = await restModel
        .find({ menu: { $exists: true}})
        .exec();
    res.json(docs);
});

module.exports = router;