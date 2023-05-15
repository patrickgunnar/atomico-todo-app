// set a 0 in front of numbers less than 10 (0, 9)
// return a string with the value
export const setZeroInFront = (value) => {
    return value < 10 ? `0${value}` : value
}

// generates calender layout
export const generatingCalenderDays = (currentDate, calendarHandler, inactiveClass, todayClass) => { // function to creates the calendar
    const date = new Date // new date
    let currentMonth = parseInt(currentDate.split('-')[1]) - 1 // current context month
    let currentYear = parseInt(currentDate.split('-')[0]) // current context year

    let currentMonthFirstWeekDay = new Date(currentYear, currentMonth, 1).getDay() // get the first month's day of the week 
    const currentMonthLastDate = new Date(currentYear, currentMonth + 1, 0).getDate() // get the last date of the month
    //const lastDay = new Date(currentYear, currentMonth, currentMonthLastDate).getDay() // get the last month's day of the week
    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate() // get the last date of previous month
    let daysElements = [] // holds the elements to be return

    let toCompleteDays = 12 // complete the 42 boxes of the template (Consider the value 11)

    if(currentMonthLastDate === 30) toCompleteDays += 1 // if current month has 30 days, add 1 to toCompleteDays (Consider the value 11) to make the template 42 boxes
    if(currentMonthLastDate === 28) toCompleteDays += 3 // if current month has 28 days, add 3 to toCompleteDays (Consider the value 11) to make the template 42 boxes
    if(currentMonthLastDate === 29) toCompleteDays += 2 // if current month has 29 days, add 3 to toCompleteDays (Consider the value 11) to make the template 42 boxes
    if(currentMonthFirstWeekDay === 0) currentMonthFirstWeekDay = 7 // if the current month first day beggins at sunday, add 7 to currentMonthFirstWeekDay

    for(let i = (currentMonthFirstWeekDay - 1); i > 0; i--) { // loop over the last days of the previous month
        let prevMonth = currentMonth // variable to hold the current month
        let prevYear = currentYear // variable to hold the current year

        if(currentMonth < 1) { // if current month is less than 1 (Feburary)
            prevMonth = 11 // set month to 11 (Dezember)
            prevYear -= 1 // sub 1 to the current year
        } else { // if current month is greater than 0 (January)
            prevMonth -= 1 // sub 1 to the current month value
        }

        // current date as string (YYYY-MM-DD) to be passed to gettingSelectedDate function
        const currentDateStr = `${prevYear}-${setZeroInFront(prevMonth + 1)}-${setZeroInFront(prevMonthLastDate - i + 1)}`

        daysElements.push( // push the days into an array
            <div key={`prevMonth-${i}`} onClick={_ => calendarHandler(currentDateStr)} className={inactiveClass}>
                <p>{prevMonthLastDate - i + 1}</p>
            </div>
        )
    }
    
    for(let i = 1; i <= currentMonthLastDate; i++) { // loop over current days of the current month
        let currentIsToday = '' // variable to append a new class if the current day is today

        // if the day is today, add another class into element
        if(date.getDate() === i && date.getMonth() === currentMonth && date.getFullYear() === currentYear)
            currentIsToday = todayClass

        // current date as string (YYYY-MM-DD) to be passed to gettingSelectedDate function
        const currentDateStr = `${currentYear}-${setZeroInFront(currentMonth + 1)}-${setZeroInFront(i)}`

        daysElements.push( // push the days into an array
            <div key={`currentMonth-${i}`} onClick={_ => calendarHandler(currentDateStr)} className={`${currentIsToday}`}>
                <p>{i}</p>
            </div>
        )
    }

    // loop over the toCompleteDays value to complete 42 boxes, startin at the current day of the week
    for(let i = currentMonthFirstWeekDay; i < toCompleteDays; i++) { // generates next month first week
        let nextMonth = currentMonth // variable to hold the current month
        let nextYear = currentYear // variable to hold the current year

        if(nextMonth > 10) { // if current month is greater than 10 (November)
            nextMonth = 0 // set month to (January)
            nextYear += 1 // sum 1 to the current year
        } else { // if current month is less than 11 (December)
            nextMonth += 1 // sum 1 to the current month
        }

        // current date as string (YYYY-MM-DD) to be passed to gettingSelectedDate function
        const currentDateStr = `${nextYear}-${setZeroInFront(nextMonth + 1)}-${setZeroInFront(i - currentMonthFirstWeekDay + 1)}`

        daysElements.push( // push the days into an array
            <div key={`nextMonth-${i}`} onClick={_ => calendarHandler(currentDateStr)} className={inactiveClass}>
                <p>{i - currentMonthFirstWeekDay + 1}</p>
            </div>
        )
    }

    return [currentMonth, currentYear, [daysElements]] // return the elements
}
