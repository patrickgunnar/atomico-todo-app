import { creatingtingElementID } from "../api functions/id-function"
import { addHours, generatingTodaysDate } from '../api functions/today-date-function'
import ConnectMongo from "../mongodb/ConnectMongo"


export default async function handler(action, ids, dataToInsert, currentUser) {
    try {
        // connect to mongodb
        const client = await ConnectMongo()
        // get the database and the "users" collection
        const usersCollection = client.db().collection('users')
        // look for user temp key
        const user = await usersCollection.findOne({ currentKey: currentUser.currentKey })

        // if no user
        // return invalid
        if(!user) {
            client.close()
            throw new Error('Something went wrong!')
        }

        // get user's key expire time
        // take 3 hours from it
        const minimumTime = addHours(new Date(user.expireTime), -3).toISOString()
        // check if user's key stills valid
        // if key's time is between the time it was created and the time of its expiration
        const isValid = new Date() >= new Date(minimumTime) && new Date() <= new Date(user.expireTime)

        // if key's time not valid
        // return invalid
        if(!isValid) {
            client.close()
            throw new Error('Something went wrong!')
        }

        // get current user data collection
        const collection = client.db().collection(user.id)
        // unpack the ids
        const [folderId, listId, taskId] = ids

        // if the user request is to add new task
        if (action === 'add-task') {
            // if no date inside dataToInsert.date, get the current one
            // else use the inserted date
            const date = dataToInsert.date !== 'no-date' ? dataToInsert.date : generatingTodaysDate()
            // insert task into the selected list
            const result = await collection.updateOne({ id: folderId, 'lists.id': listId }, {
                $push: {
                    'lists.$.content': { $each: [{
                            "text": dataToInsert.text,
                            "id": `${listId}${creatingtingElementID('task')}`,
                            "date": date,
                            "favourite": dataToInsert.favourite,
                            "complete": false
                        }], $position: 0
                    }
                }
            })

        } else {
            // if the user request is to delete task
            if (action === 'delete-task') {
                const result = await collection.updateOne({ id: folderId, 'lists.id': listId }, {
                    $pull: {
                        'lists.$.content': {
                            id: taskId
                        }
                    }
                })
                // if the user request is to edit task
            } else if (action === 'edit-task') {
                const result = await collection.updateOne({ id: folderId, 'lists.id': listId, 'lists.content.id': taskId }, {
                    $set: {
                        'lists.$.content.$[i].text': dataToInsert.text,
                        'lists.$.content.$[i].date': dataToInsert.date
                    }
                }, {
                    arrayFilters: [{
                        'i.id': taskId
                    }]
                })
                // if the user request is to complete task
            } else if (action === 'complete-task') {
                const result = await collection.updateOne({ id: folderId, 'lists.id': listId, 'lists.content.id': taskId }, {
                    $set: {
                        'lists.$.content.$[i].complete': true
                    }
                }, {
                    arrayFilters: [{
                        'i.id': taskId
                    }]
                })
                // if the user request is to favourite
            } else if (action === 'favourite-task') {
                const result = await collection.findOneAndUpdate({ id: folderId, 'lists.id': listId, 'lists.content.id': taskId }, {
                    $set: {
                        'lists.$.content.$[i].favourite': !dataToInsert.isFav
                    }
                }, {
                    arrayFilters: [{
                        'i.id': taskId
                    }]
                })
            }
        }

        client.close()
        // return data
        return (await collection.find({}).toArray((err, result) => result)).reverse()
    } catch (error) {
        throw new Error('Something went wrong!')
    }
}
