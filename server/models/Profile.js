const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender:{
        type:String,

    },
    dateOfBirth: {
        type:String,
    },
    about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
});

// Export the Profile model
module.exports = mongoose.models.Profile || mongoose.model("Profile", profileSchema);