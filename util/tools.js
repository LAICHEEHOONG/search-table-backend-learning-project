

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
    return startDate;
}


module.exports = {
    setEndDate,
    setStartDate
};