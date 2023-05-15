import { creatingtingElementID } from "../api functions/id-function"


export default function handler(action, ids, dataToInsert, currentData) {
    // if user request is to insert new list
    if(action === 'insert-list') {
        const newList = {
            "name": dataToInsert,
            "id": creatingtingElementID('list'),
            "folder": false,
            "content": []
        }

        return [
            newList,
            ...currentData
        ]

    } else {
        const [ listId, folderId ] = ids

        // if user request is to insert new list inside folder
        if(action === 'insert-in-folder') {
            const newList = {
                "name": dataToInsert,
                "id": `${folderId}${creatingtingElementID('list')}`,
                "folder": false,
                "content": []
            }

            currentData.forEach(item => {
                if(item.id === folderId) {
                    item.lists = [
                        newList,
                        ...item.lists
                    ]
                }
            })

            return currentData

            // if user request is to update list's name
        } else if(action === 'name-edit') {
            return currentData.map(item => {
                if(item.id === listId) item.name = dataToInsert

                return item
            })
            
            // if user request is to delete list
        } else if(action === 'delete-item') {
            return currentData.filter(item => item.id !== listId)
        }
    }
}
