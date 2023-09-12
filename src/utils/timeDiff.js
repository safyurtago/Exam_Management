const checkTimeDiff = async (date1, date2) => {
    let diff = date1 - date2;

    diff = Math.round((diff / 1000) / 60);
    return diff
}

module.exports = checkTimeDiff;