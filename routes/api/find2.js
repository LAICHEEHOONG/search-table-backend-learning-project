const express = require('express');
let router = express.Router();
const { Announcement } = require('../../model/testModel');
const { setEndDate, setStartDate, addOneDay } = require('../../util/tools');




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
    .post(async (req, res) => {
        const batchSize = 15;
        const skipAmount = (pageNumber) => {
            let result = (pageNumber - 1) * batchSize;
            return result;
        };
        let searhData = req.body.searchData;

        try {

            if ((searhData.startDate === '' || !searhData.startDate) && (searhData.endDate === '' || !searhData.endDate)) {
                const searchText = searhData.text;
                const annoucementTimeZoneData = await Announcement.find({
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                }).sort({ created: 'desc' })
                    .skip(skipAmount(searhData.page))
                    .limit(batchSize);

                let allPage = await Announcement.find({
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                })

                allPage = Math.ceil(allPage.length / 15);

                res.json([annoucementTimeZoneData, { allPage }]);
            } else if (searhData.endDate === '' || !searhData.endDate) {
                // const startDate = new Date(searhData.startDate);
                let startDate = setStartDate(searhData.startDate);
                const searchText = searhData.text;
                const annoucementTimeZoneData = await Announcement.find({
                    created: {
                        $gte: startDate,
                        // $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                }).sort({ created: 'desc' })
                    .skip(skipAmount(searhData.page))
                    .limit(batchSize);

                let allPage = await Announcement.find({
                    created: {
                        $gte: startDate,
                        // $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                });

                allPage = Math.ceil(allPage.length / 15);

                res.json([annoucementTimeZoneData, { allPage }]);
            } else if (searhData.startDate === '' || !searhData.startDate) {
                let endDate = setEndDate(searhData.endDate);
                // const endDate = addOneDay(new Date(searhData.endDate));
                // const endDate = setEndDate(searhData.endDate);
                // const endDate = new Date(searhData.endDate);
                const searchText = searhData.text;
                const annoucementTimeZoneData = await Announcement.find({
                    created: {
                        // $gte: startDate,
                        $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                }).sort({ created: 'desc' })
                    .skip(skipAmount(searhData.page))
                    .limit(batchSize);

                let allPage = await Announcement.find({
                    created: {
                        // $gte: startDate,
                        $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                })
                allPage = Math.ceil(allPage.length / 15);
                res.json([annoucementTimeZoneData, { allPage }]);
            } else {
                const startDate = setStartDate(searhData.startDate);
                const endDate = setEndDate(searhData.endDate);
                // const startDate = new Date(searhData.startDate);
                // const endDate = setEndDate(searhData.endDate);
                // const endDate = addOneDay(new Date(searhData.endDate));
                // const endDate = new Date(searhData.endDate);
                const searchText = searhData.text;
                const annoucementTimeZoneData = await Announcement.find({
                    created: {
                        $gte: startDate,
                        $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                }).sort({ created: 'desc' })
                    .skip(skipAmount(searhData.page))
                    .limit(batchSize);
                let allPage = await Announcement.find({
                    created: {
                        $gte: startDate,
                        $lte: endDate
                    },
                    $or: [
                        { content: { $regex: searchText, $options: 'i' } },
                        { title: { $regex: searchText, $options: 'i' } },
                        { status: { $regex: searchText, $options: 'i' } },
                        { targetGroup: { $regex: searchText, $options: 'i' } }
                    ]
                });
                allPage = Math.ceil(allPage.length / 15);
                res.json([annoucementTimeZoneData, { allPage }]);
            }


        } catch (err) {
            console.log(err);
            res.json([[], { allPage: 1 }, { warning: 'post search data error', err }])
        }
    })





module.exports = router;