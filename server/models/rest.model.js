const { Schema, model } = require('mongoose');

const restSchema = new Schema(
    {
        name: {type: String, required: true},
        telephone: {type: String},
        address: {type: String},
        image: {type: String},
        menu: 
            {
                name: {type: String},
                items:
                [{
                    name: {type: String},
                    price: {type: Number}
                }]
            }
    }
);

const restModel = model('restaurant', restSchema);

module.exports = {
    restModel,
};