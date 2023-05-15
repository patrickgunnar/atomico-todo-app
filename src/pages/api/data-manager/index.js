import folder_db_handler_data from '../mongodb/folder_db_handler_data'
import list_db_handler_data from '../mongodb/list_db_handler_data'
import folder_handler from './folder_handler'
import list_handler from './list_handler'


export default async function handler(req, res) {
    if (req.method == 'POST') {
        // unpack passed data
        const { where, action, ids, dataToInsert, loopOverData, isUser } = req.body
        // parse profile data
        const user = JSON.parse(isUser)
        let returnData = []

        // if the request is to be operated inside folder
        if (where === 'list-inside-folder') {
            // if data
            if (action && ids && loopOverData && dataToInsert) {
                try {
                    // if current user profile
                    // operates on db
                    if(user.user !== 'no-current-user' && user.email !== 'no-current-email') {
                        returnData = await folder_db_handler_data(action, ids, JSON.parse(dataToInsert), user)
                        // no user profile
                        // operates locally
                    } else {
                        returnData = folder_handler(action, ids, JSON.parse(dataToInsert), JSON.parse(loopOverData))
                    }

                    // if data
                    // return it
                    if(returnData.length > 0) {
                        res.status(201).json({
                            title: 'Request Succeeded', 
                            message: 'The current request was completed with success!',
                            status: true,
                            content: returnData
                        })

                        return 
                    }

                } catch (error) {
                    res.status(400).json({
                        title: 'Process Error', 
                        message: 'An error occurred while attempting to process the request!',
                        status: false
                    })

                    return 
                }
            }

            // if the request is to be operated outside folder
        } else if (where === 'list-outside-folder') {
            // if data
            if (action && ids && loopOverData && dataToInsert) {
                try {
                    // if current user profile
                    // operates on db
                    if(user.user !== 'no-current-user' && user.email !== 'no-current-email') {
                        returnData = await list_db_handler_data(action, ids, JSON.parse(dataToInsert), user)
                        // no user profile
                        // operates locally
                    } else {
                        returnData = list_handler(action, ids, JSON.parse(dataToInsert), JSON.parse(loopOverData))
                    }

                    // if data
                    // return it
                    if(returnData.length > 0) {
                        res.status(201).json({
                            title: 'Request Succeeded', 
                            message: 'The current request was completed with success!',
                            status: true,
                            content: returnData
                        })

                        return 
                    }

                } catch (error) {
                    res.status(400).json({
                        title: 'Process Error', 
                        message: 'An error occurred while attempting to process the request!',
                        status: false
                    })

                    return 
                }
            }
        }
    }

    res.status(400).json({
        title: 'Process Error', 
        message: 'An error occurred while attempting to process the request!',
        status: false
    })

    return 
}
