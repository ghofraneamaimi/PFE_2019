const mongoose = require('mongoose');

var dashboard = mongoose.model('dashboard', {
    nomdash: { type: String,},
    taille: { type: String },
    extension: { type: String},
    dateSend: { type: Date},
    client_id: {type: mongoose.Schema.Types.ObjectId,  ref: 'Client'},
	filename: { type: String},
    filepath: { type: String}
});

module.exports = { dashboard };