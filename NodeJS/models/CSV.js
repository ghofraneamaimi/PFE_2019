const mongoose = require('mongoose');

var CSV = mongoose.model('CSV', {
    nomdoc: { type: String},
    taille: { type: Number },
    dateupload: { type: Date},
    client_id: {type: mongoose.Schema.Types.ObjectId,  ref: 'Client'},
	filename: { type: String},
    filepath: { type: String}
});

module.exports = { CSV };