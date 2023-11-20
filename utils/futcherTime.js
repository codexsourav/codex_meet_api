const fetcherTime = (min) => {
    var now = new Date();
    now.setMinutes(now.getMinutes() + min); // timestamp
    now = new Date(now); // Date object
    return now;
}

export default fetcherTime;


export function isDateUpToCurrent(dateToCheck) {
    const currentDate = new Date();
    const inputDate = new Date(dateToCheck);
    // console.log(inputDate <= currentDate);
    // console.log(`${inputDate} <= ${currentDate}`);

    return inputDate <= currentDate;
}

