import { addHours } from '../api functions/today-date-function'
import ConnectMongo from "../mongodb/ConnectMongo"
import { hashPassword, verifyPassword } from '../password-verify/password-handler'


const data_handler = async (action, id, data) => {
    try {
        // connect to mongodb
        const client = await ConnectMongo()
        // get the database and the "users" collection
        const usersCollection = client.db().collection('users')
        // look for user temp key
        const user = await usersCollection.findOne({ currentKey: id })

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

        // if the user request is to update the account's password
        if(action === 'update-password') {
            const { oldPass, newPass, newPassAgain } = data
            // if entered password matches to the current ones or not
            const isValidPassword = await verifyPassword(oldPass, user.password)

            // if password does not match or password is equal to the new password
            // return invalid
            if(!isValidPassword || oldPass === newPass) {
                client.close()
                throw new Error('Something went wrong!')
            }

            // hash the new password
            const hashedPassword = await hashPassword(newPass.trim())

            // if not the hashed password
            // return invalid
            if(!hashedPassword) {
                client.close()
                throw new Error('Something went wrong!')
            }

            // updates password on db
            const result = await usersCollection.updateOne({ currentKey: id }, {
                $set: {
                    password: hashedPassword
                }
            })
            // if the user request is to update the profile picture
        } else if(action === 'update-picture') {
            const result = await usersCollection.updateOne({ currentKey: id }, {
                $set: {
                    photo: data
                }
            })
            // if the user request is to update the current email
        } else if(action === 'update-email') {
            const result = await usersCollection.updateOne({ currentKey: id }, {
                $set: {
                    email: data
                }
            })
            // if the user request is to update the current name
        } else if(action === 'update-name') {
            const result = await usersCollection.updateOne({ currentKey: id }, {
                $set: {
                    username: data
                }
            })
        }

        // return updated data
        return await usersCollection.findOne({ currentKey: id })
    } catch (error) {
        throw new Error('Something went wrong!')
    }
}

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { action, id, data } = req.body
        let returnData = []

        try {
            // if user action, id and data
            if(action && id && data) {
                // if action is to update password
                if(action === 'update-password') {
                    const pass = JSON.parse(data)

                    // check the password
                    if(pass.newPass.length <= 6 || !pass.oldPass.trim() || pass.newPassAgain !== pass.newPass) {
                        res.status(400).json({
                            title: 'Process Error', 
                            message: 'The password is too short, it must be at least 6 characters!',
                            status: false
                        })
                    
                        return 
                    }
                    
                    // call function to do the request
                    returnData = await data_handler(action, id, pass)
                    // if action is to update the picture
                } else if(action === 'update-picture') {
                    if(!data) {
                        res.status(400).json({
                            title: 'Process Error', 
                            message: 'No image selected, choose an image and try again!',
                            status: false
                        })
                    
                        return 
                    }
    
                    // call function to do the request
                    returnData = await data_handler(action, id, data)
                    // if action is to update the email
                } else if(action === 'update-email') {
                    if(!data && !data.trim().includes('@')) {
                        res.status(400).json({
                            title: 'Process Error', 
                            message: 'Invalid e-mail, try again!',
                            status: false
                        })
                    
                        return 
                    }
    
                    // call function to do the request
                    returnData = await data_handler(action, id, data)
                    // if action is to update the name
                } else if(action === 'update-name') {
                    if(!data && !data.trim().length >= 2) {
                        res.status(400).json({
                            title: 'Process Error', 
                            message: 'The name must be at least 2 characters long, try again!',
                            status: false
                        })
                    
                        return 
                    }
    
                    // call function to do the request
                    returnData = await data_handler(action, id, data)
                }
    
                // if data
                // return data
                if(returnData) {
                    res.status(201).json({
                        title: 'Request Succeeded', 
                        message: 'The current request was completed with success!',
                        status: true,
                        content: returnData
                    })
    
                    return 
                }
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

    res.status(400).json({
        title: 'Process Error', 
        message: 'An error occurred while attempting to process the request!',
        status: false
    })

    return 
}
