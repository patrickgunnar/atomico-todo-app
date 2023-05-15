import { setZeroInFront } from "./extra-functions"


// search handler
const elementIncludes = (text, searchFor) => {
    return text.toLowerCase().includes(searchFor.toLowerCase())
}

// months array
export const monthList = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] // months

// return a string of formatted date
export const convertingDateToExpressionDate = (date) => { 
    const dateList = date.split('-') // split date date [2023, 11, 01] year/month/day format
    const currentMonth = parseInt(dateList[1]) // transform month string into number

    return `${monthList[currentMonth - 1]}, ${dateList[2]} of ${dateList[0]}`
}

// split task id into folder or list id
// return folder or list id and task id
export const addingNewTaskToCurrrentList = (id) => { 
    if(id.includes('FOLDER')) return [id.split('LIST')[0], id.split('TASK')[0], id]
    else return [id.split('TASK')[0], id]
}

// generates today's date on format YYYY-MM-DD
export const gettingTodaysDate = () => {
    return `${new Date().getFullYear()}-${setZeroInFront(new Date().getMonth() + 1)}-${setZeroInFront(new Date().getDate())}`
}

// filter lists of the user data
// inside and outside folder
export const filteringListOption = (data) => {
    const optionData = []

    data.forEach(element => {
        if(element.folder) element.lists.forEach(list => optionData.push(<option key={list.id} value={list.id}>{list.name}</option>))
        if(!element.folder) optionData.push(<option key={element.id} value={element.id}>{element.name}</option>)
    })

    return optionData
}

// get data from user data to be displayed at the current page, selected date or search
export const gettingDataTasks = (data, from, calenderDate, searchFor) => {
    const returnElements = []

    data.forEach(element => {
        if(element.folder) {
            element.lists.forEach(list => {
                list.content.forEach(task => {
                    if(from === 'from-calender') {
                        if(task.date === calenderDate) returnElements.push(task)
                    }
                    else if(from === 'from-favourite') {
                        if(task.favourite) returnElements.push(task)
                    }
                    else if(from === 'from-my-day') {
                        const todaysDate = gettingTodaysDate()

                        if(task.date === todaysDate) returnElements.push(task)
                    }
                    else if(from === 'from-search') {
                        if(elementIncludes(task.text, searchFor)) returnElements.push(task)
                    }
                })
            })
        } else {
            element.content.forEach(task => {
                if(from === 'from-calender') {
                    if(task.date === calenderDate) returnElements.push(task)
                }
                else if(from === 'from-favourite') {
                    if(task.favourite) returnElements.push(task)
                }
                else if(from === 'from-my-day') {
                    const todaysDate = gettingTodaysDate()

                    if(task.date === todaysDate) returnElements.push(task)
                }
                else if(from === 'from-search') {
                    if(elementIncludes(task.text, searchFor)) returnElements.push(task)
                }
            })
        }
    })

    return returnElements
}

// filter user data from ousite folder list
export const filteringSelectedDataHandler = (data, id) => {
    return data.filter(element => element.id === id)
}

// filter user data from inside folder list
export const filteringSelectedDataFromFolderHandler = (data, parentId, childId) => {
    const currentDisplayData = data.filter(element => element.id === parentId)[0]

    return currentDisplayData.lists.filter(list => list.id === childId)
}

// filtering folder options from user data
export const filteringFolderOption = (data) => {
    const optionData = [<option key='no-folder-insertion' value='no-folder-insertion'>No Folder Insertion</option>]

    data.forEach(element => {
        if(element.folder) optionData.push(<option key={element.id} value={element.id}>{element.name}</option>)
    })

    return optionData
}
