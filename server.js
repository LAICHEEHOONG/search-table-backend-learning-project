const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

const pages = require('./routes/api/page');
const search = require('./routes/api/find');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/page', pages);
app.use('/api/find', search);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, '/view/index.html'));
      }
    });
  })


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})







// .post(async (req, res) => {
//     const batchSize = 15;
//     const skipAmount = (pageNumber) => {
//         let result = (pageNumber - 1) * batchSize;
//         return result;
//     };
//     let searhData = req.body.searchData;
//     const searchStatus = searhData.status;
//     const searchTargetGroup = searhData.targetGroup;

//     try {

//         if ((searhData.startDate === '' || !searhData.startDate) && (searhData.endDate === '' || !searhData.endDate)) {
//             const searchText = searhData.text;
           
//             const annoucementTimeZoneData = await Announcement.find({
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             }).sort({ created: 'desc' })
//                 .skip(skipAmount(searhData.page))
//                 .limit(batchSize);

//             let allPage = await Announcement.find({
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             })

//             allPage = Math.ceil(allPage.length / 15);

//             res.json([annoucementTimeZoneData, { allPage }]);
//         } else if (searhData.endDate === '' || !searhData.endDate) {
//             // const startDate = new Date(searhData.startDate);
//             let startDate = setStartDate(searhData.startDate);
//             const searchText = searhData.text;
//             const annoucementTimeZoneData = await Announcement.find({
//                 created: {
//                     $gte: startDate,
//                     // $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             }).sort({ created: 'desc' })
//                 .skip(skipAmount(searhData.page))
//                 .limit(batchSize);

//             let allPage = await Announcement.find({
//                 created: {
//                     $gte: startDate,
//                     // $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             });

//             allPage = Math.ceil(allPage.length / 15);

//             res.json([annoucementTimeZoneData, { allPage }]);
//         } else if (searhData.startDate === '' || !searhData.startDate) {
//             let endDate = setEndDate(searhData.endDate);
//             const searchText = searhData.text;
//             const annoucementTimeZoneData = await Announcement.find({
//                 created: {
//                     // $gte: startDate,
//                     $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             }).sort({ created: 'desc' })
//                 .skip(skipAmount(searhData.page))
//                 .limit(batchSize);

//             let allPage = await Announcement.find({
//                 created: {
//                     // $gte: startDate,
//                     $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             })
//             allPage = Math.ceil(allPage.length / 15);
//             res.json([annoucementTimeZoneData, { allPage }]);
//         } else {
//             const startDate = setStartDate(searhData.startDate);
//             const endDate = setEndDate(searhData.endDate);
//             const searchText = searhData.text;
//             const annoucementTimeZoneData = await Announcement.find({
//                 created: {
//                     $gte: startDate,
//                     $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             }).sort({ created: 'desc' })
//                 .skip(skipAmount(searhData.page))
//                 .limit(batchSize);
//             let allPage = await Announcement.find({
//                 created: {
//                     $gte: startDate,
//                     $lte: endDate
//                 },
//                 $or: [
//                     { content: { $regex: searchText, $options: 'i' } },
//                     { title: { $regex: searchText, $options: 'i' } },
//                     { status: { $regex: searchText, $options: 'i' } },
//                     { targetGroup: { $regex: searchText, $options: 'i' } }
//                 ]
//             });
//             allPage = Math.ceil(allPage.length / 15);
//             res.json([annoucementTimeZoneData, { allPage }]);
//         }


//     } catch (err) {
//         console.log(err);
//         res.json([[], { allPage: 1 }, { warning: 'post search data error', err }])
//     }
// })