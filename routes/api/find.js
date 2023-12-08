const express = require('express');
let router = express.Router();

const { Announcement } = require('../../model/testModel');

router.route('/')
    .get(async (req, res) => {
        try {
            const annoucementData = await Announcement.find();
            // console.log(annoucementData);
            res.status(200).json(annoucementData);
        } catch (error) {
            console.log(error);
            res.json({ warning: 'Get annoucementData data error', error });
        }
    })

module.exports = router;