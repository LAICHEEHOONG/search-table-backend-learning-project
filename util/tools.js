// function addOneDay(date) {
//     let newDate = new Date(date);
//     newDate.setDate(newDate.getDate() + 1);
//     return newDate;
// }

function addOneDay(date) {
    let newDate = date;
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

function setEndDate(date) {
    let endDate = new Date(date);
    endDate = endDate.setHours(23, 59, 59, 999);
    endDate = new Date(endDate);
    // endDate = toMalaysiaTime(endDate);
    // console.log(`endDate: ${endDate}`);
    return endDate;
}

function setStartDate(date) {
    let startDate = new Date(date);
    startDate = startDate.setHours(0, 0, 0, 0);
    startDate = new Date(startDate);
    // startDate = toMalaysiaTime(startDate);
    // console.log(`startDate: ${startDate}`);
    return startDate;
}

function toMalaysiaTime(date) {
    const dateInUTC = date;
    const malaysiaTime = new Date(dateInUTC.getTime() + (8 * 60 * 60 * 1000)); 
    return malaysiaTime;
}

// let testingEndDate = new Date(searhData.endDate);
// testingEndDate = testingEndDate.setHours(23, 59, 59, 999);
// console.log(new Date(searhData.endDate), 'vs', new Date(testingEndDate))

module.exports = {
    addOneDay,
    setEndDate,
    setStartDate
};