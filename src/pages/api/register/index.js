import { creatingtingElementID } from "../api functions/id-function"
import { addHours } from "../api functions/today-date-function"
import ConnectMongo from "../mongodb/ConnectMongo"
import { hashPassword } from "../password-verify/password-handler"
import { noCurrentUserStartData } from "../start-data"


export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { email, password } = req.body

        // if passed email is empty or not includes a "@"
        // return invalid
        if(!email || !email.includes('@')) {
            res.status(422).json({ 
                title: 'Error',
                message: 'Invalid e-mail!' 
            })
            return
        }

        // if no password or password is less tahn 6 digits
        // return invalid
        if(!password || password.trim().length < 6) {
            res.status(422).json({ 
                title: 'Error',
                message: 'Password must be at least 6 characters!' 
            })
            return
        }

        try {
            // connect to mongodb client
            const client = await ConnectMongo()
            // get the database
            const db = client.db()
            // get users collection
            const existsUser = await db.collection('users').findOne({ email: email })

            // if user is already registered
            // return invalid
            if(existsUser) {
                client.close()
                res.status(422).json({ 
                    title: 'Error',
                    message: 'User is already on system, try another one or make login!' 
                })

                return
            }

            // creates an id to the user
            const userId = creatingtingElementID('user')
            // insert user start data into user's collection
            const dbResult = await db.collection(userId).insertMany(noCurrentUserStartData)
            // generates a user's temp key
            const key = await hashPassword(await creatingtingElementID('key'))
            // add the expire time for the user's key
            const expireTime = addHours(new Date(new Date().toISOString()), 3).toISOString()

            // creates user profile data
            const userData = {
                email: email.trim(),
                password: await hashPassword(password.trim()),
                username: email.split('@')[0],
                photo: 'no-picture',
                currentKey: key,
                expireTime: expireTime,
                id: userId,
            }

            // insert user to "users" collection
            const userResult = await db.collection('users').insertOne(userData)

            // if user and user data was created
            // return with success
            if(dbResult && userResult) {
                client.close()

                delete userData.expireTime

                res.status(201).json({ 
                    title: 'Success',
                    message: 'Registered with success!',
                    user: userData,
                    data: noCurrentUserStartData.reverse()
                })

                return
            } else {
                client.close()
                res.status(422).json({ 
                    title: 'Error',
                    message: 'Something went wrong, try again!'
                })

                return
            }
        } catch (error) {
            res.status(422).json({ 
                title: 'Error',
                message: 'Something went wrong, try again!'
            })

            return
        }
    }
}
