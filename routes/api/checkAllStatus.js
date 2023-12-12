const express = require('express');
let router = express.Router();

const { Announcement } = require('../../model/announcementModel');



router.route('/')
  .get(async (req, res) => {
    try {
      let data = await Announcement.find();
      res.status(200).json({ result: data });
    } catch (error) {
      console.log(error);
      res.json({ warning: 'Get totalPage error', error });
    }
  })


module.exports = router;









