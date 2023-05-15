import { creatingtingElementID } from "../api functions/id-function"
import ConnectMongo from '../mongodb/ConnectMongo'
import { addHours } from '../api functions/today-date-function'


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

        // if the user request is to add new list
        if(action === 'insert-list') {
            const result = await collection.insertOne({
                "name": dataToInsert,
                "id": creatingtingElementID('list'),
                "folder": false,
                "content": []
            })
        } else {
            // unpack ids
            const [ listId, folderId ] = ids

            // if user request is to insert new folder
            if(action === 'insert-in-folder') {
                const result = await collection.updateOne({ id: folderId }, {
                    $push: {
                        lists: {
                            $each: [
                                {
                                    "name": dataToInsert,
                                    "id": `${folderId}${creatingtingElementID('list')}`,
                                    "folder": false,
                                    "content": []
                                }
                            ], $position: 0
                        }
                    }
                })
                // if user request is to delete folder
            } else if(action === 'delete-item') {
                const result = await collection.deleteOne({ id: listId })
                // if user request is to updates folder's name
            } else if(action === 'name-edit') {
                const result = await collection.updateOne({ id: listId }, {
                    $set: {
                        name: dataToInsert
                    }
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
