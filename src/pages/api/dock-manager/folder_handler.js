import { creatingtingElementID } from "../api functions/id-function"


export default function handler(action, ids, dataToInsert, currentData) {
    // if user request is to insert new folder
    if(action === 'insert-folder') {
        const newFolder = {
            "name": dataToInsert,
            "id": creatingtingElementID('folder'),
            "folder": true,
            "lists": []
        }

        return [
            newFolder,
            ...currentData
        ]

    } else {
        const [folderId, listId] = ids

        // if user request is to update folder's or list's name
        if(action === 'name-edit') {
            return currentData.map(item => {
                // updates list
                if(listId) {
                    if(item.id === folderId) item.lists.map(list => {
                        if(list.id === listId) list.name = dataToInsert
                    })

                    // updtades folder
                } else {
                    if(item.id === folderId) item.name = dataToInsert
                }

                return item
            })

            // if user request is to delete folder or list
        } else if(action === 'delete-item') {
            // updates list
            if(listId) {
                return currentData.map(item => {
                    if(item.id === folderId) item.lists = item.lists.filter(list => list.id !== listId)
            
                    return item
                })

                // updtades folder
            } else {
                return currentData.filter(item => item.id !== folderId)
            }
        }
    }
}
