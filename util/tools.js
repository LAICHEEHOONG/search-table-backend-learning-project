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

    console.log(endDate);
    return endDate;
}

// let testingEndDate = new Date(searhData.endDate);
// testingEndDate = testingEndDate.setHours(23, 59, 59, 999);
// console.log(new Date(searhData.endDate), 'vs', new Date(testingEndDate))

module.exports = {
    addOneDay,
    setEndDate
};