const mongoose = require('mongoose');

var Client = mongoose.model('Client', {
    name: { type: String,required: 'Full name can\'t be empty'},
    username: { type: String  },
    password: { type: String },
	phone: { type: String, required: true },
	email:{ type: String, required: true},
	role: { type: Number, default: 2 }
  
});

module.exports = { Client };