const express = require('express');
let router = express.Router();

const { Announcement } = require('../../model/announcementModel');

const getDataInBatches = async (pageNumber) => {
  const batchSize = 15;
  const skipAmount = (pageNumber - 1) * batchSize;

  try {
    // Query MongoDB using Mongoose to get data in batches
    const data = await Announcement.find()
      .sort({ created: 'desc' }) // Assuming your field is named 'createdAt'
      .skip(skipAmount)
      .limit(batchSize);

    return data;
  } catch (error) {
    // Handle error
    console.error('Error fetching data:', error);
    return []; // Return empty array or handle error as needed
  }
};

router.route('/')
  .get(async (req, res) => {
    try {
      const data = await Announcement.find();
      const totalPage = data.length;
      const fiftyPage = Math.ceil(totalPage / 15);

      res.status(200).json({ pages: fiftyPage });
    } catch (error) {
      console.log(error);
      res.json({ warning: 'Get totalPage error', error });
    }
  })
  .post(async (req, res) => {
    try {
      const pageNum = req.body.pageNum;
      const pages = await getDataInBatches(pageNum);
      // console.log(pages);
      res.status(200).json(pages);

    } catch (error) {
      console.log(error);
      res.json({ warning: 'Pages error', error });
    }
  })

module.exports = router;









