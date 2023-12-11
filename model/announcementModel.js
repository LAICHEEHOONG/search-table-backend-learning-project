const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    // content: { type: String }, 
});


const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = { Announcement };


