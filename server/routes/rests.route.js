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

router.get("/restCount", async (req, res) => { 
    const docs = await restModel
        .find({ menu: { $exists: true}})
        .countDocuments({})
        .exec();
    res.json(docs);
});
router.get('/', async (req, res) => { 
    let setLimit = parseInt(req.query.limit);
    let skipCount = (parseInt(req.query.page) * setLimit) - setLimit;
    const docs = await restModel
        .find({ menu: { $exists: true}})
        .skip(skipCount)
        .limit(setLimit)
        .exec();
    res.json(docs);
});

router.get("/:id", async (req, res) => { 
    const docs = await restModel
        .find({"_id": req.params.id})
        .exec();
    res.json(docs);
});

module.exports = router;