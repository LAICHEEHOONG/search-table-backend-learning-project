const express = require('express');
let router = express.Router();
const { Announcement } = require('../../model/announcementModel');
const { setEndDate, setStartDate } = require('../../util/tools');

const batchSize = 15;
const skipAmount = (pageNumber) => {
    let result = (pageNumber - 1) * batchSize;
    return result;
};


router.route('/')
    .get(async (req, res) => {
        try {
            const annoucementData = await Announcement.find()
                .sort({ created: 'desc' })
                .skip(skipAmount(searhData.page))
                .limit(batchSize);;
         
            res.status(200).json(annoucementData);
        } catch (error) {
            console.log(error);
            res.json({ warning: 'Get annoucementData data error', error });
        }
    })
    .post(async (req, res) => {
        let data = req.body.searchData;
        let {text, startDate, endDate, page, targetGroup, status} = data;

        if(startDate) {
            startDate = setStartDate(startDate);
        }
        
        if(endDate) {
            endDate = setEndDate(endDate);
        }

        const query = {};

        if(text) {
            query.title = { $regex: text, $options: 'i' }
        }

        if (targetGroup && targetGroup !== 'All') {
            query.targetGroup = targetGroup;
        }

        if(status && status !== 'All') {
            query.status = status;
        }

        if(startDate && !endDate) {
            query.created = {
                $gte: startDate
            };
        }

        if(!startDate && endDate) {
            query.created = {
                $lte: endDate
            }
        }

        if(startDate && endDate) {
            query.created = {
                $gte: startDate,
                $lte: endDate
            }
        }

        try {
            const annoucementData = await Announcement
                                            .find(query)
                                            .sort({ created: 'desc' })
                                            .skip(skipAmount(page))
                                            .limit(batchSize);

            // Fetch total count for pagination
            const totalCount = await Announcement.countDocuments(query);
            const allPage = Math.ceil(totalCount / 15);

            res.json([annoucementData, { allPage }]);
            
        } catch (err) {
            console.log(err);
            res.json([[], { allPage: 1 }, { warning: 'post search data error', err }])
        }
    })






module.exports = router;
