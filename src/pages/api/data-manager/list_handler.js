import { creatingtingElementID } from "../api functions/id-function"


export default function handler(action, ids, dataToInsert, currentData) {
    // unpack ids
    const [listId, taskId] = ids

    return currentData.map(item => {
        // if list's id equal to the passed id
        if (item.id === listId) {
            // add task
            if (action === 'add-task') {
                // if no passed date
                    // get the current date
                    // else get passed date
                const date = dataToInsert.date !== 'no-date' ? dataToInsert.date : generatingTodaysDate()

                item.content.unshift({
                    "text": dataToInsert.text,
                    "id": `${listId}${creatingtingElementID('task')}`,
                    "date": date,
                    "favourite": dataToInsert.favourite,
                    "complete": false,
                })

            } else {
                // if to delete task
                if (action === 'delete-task') {
                    item.content = item.content.filter(task => task.id !== taskId)

                } else {
                    item.content.map(task => {
                        if (task.id === taskId) {
                            // if to edit task
                            if (action === 'edit-task') {
                                task.text = dataToInsert.text
                                task.date = dataToInsert.date
    
                                // if to complete task
                            } else if (action === 'complete-task') {
                                task.complete = true
    
                                // if to favourite task
                            } else if (action === 'favourite-task') {
                                task.favourite = !task.favourite
    
                            }
                        }
                    })
                }
            }
        }

        return item
    })
}
