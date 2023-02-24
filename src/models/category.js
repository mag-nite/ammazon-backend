const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        require: true,
        unique: true
    },
    categoryImage: { type: String}
},{timestamps: true});

module.exports = mongoose.model('Catergory',categorySchema)