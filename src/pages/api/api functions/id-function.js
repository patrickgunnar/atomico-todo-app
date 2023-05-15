// set a 0 in front of numbers less than 10 (0, 9)
// return a string with the value
const setZeroInFront = (value) => {
    return value < 10 ? `0${value}` : value
}

// generates an id
export const creatingtingElementID = (origin) => {
    const date = new Date()

    // The Generated id
    // The code where function was called
    // current year, current month, current day, 
    // current hours, current minutes, current seconds, 
    // current miliseconds and milliseconds elapsed since the epoch
    return `${origin.toLocaleUpperCase()}${date.getFullYear()}${setZeroInFront(date.getMonth())}${setZeroInFront(date.getDate())}
                        ${setZeroInFront(date.getHours())}${setZeroInFront(date.getMinutes())}${setZeroInFront(date.getSeconds())}
                        ${setZeroInFront(date.getMilliseconds())}${Date.now()}`.replace(/[^a-z0-9]/gi, '')
}
