// set 0 in front number less than 10
export const setZeroInFrontNumber = (value) => {
    return value < 10 ? `0${value}` : value
}

// generates a string with today's date YYYY-MM-DD
export const generatingTodaysDate = () => {
    return `${new Date().getFullYear()}-${setZeroInFrontNumber(new Date().getMonth() + 1)}-${setZeroInFrontNumber(new Date().getDate())}`
}

// some hours to a date
export const addHours = (date, hours) => {
    date.setHours(date.getHours() + hours);

    return date
}
