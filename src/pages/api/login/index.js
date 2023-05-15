import { creatingtingElementID } from "../api functions/id-function"
import { addHours } from "../api functions/today-date-function"
import ConnectMongo from "../mongodb/ConnectMongo"
import { hashPassword, verifyPassword } from "../password-verify/password-handler"


export default async function handler(req, res) {
    if (req.method === 'POST') {
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
                message: 'Invalid password!' 
            })
            return
        }

        try {
            // connect to mongodb client
            const client = await ConnectMongo()
            // get the database
            const usersCollection = client.db().collection('users')
            // get users collection
            const user = await usersCollection.findOne({ email: email })

            // if user is already registered
            // return invalid
            if (!user) {
                client.close()
                res.status(422).json({
                    title: 'Error',
                    message: 'Invalid e-mail!'
                })

                return
            }

            // compare if entered password is the same of the db password
            const isvalid = await verifyPassword(password, user.password)

            // if entered password not valid
            // return invalid
            if (!isvalid) {
                client.close()
                res.status(422).json({
                    title: 'Error',
                    message: 'Invalid password!'
                })

                return
            }

            // get user data from user's collection
            const userData = (await client.db().collection(user.id).find({}).toArray((err, result) => result)).reverse()
            // generates a new user's key
            const key = await hashPassword( await creatingtingElementID('key'))
            // generates an expire time for the user's key
            const expireTime = addHours(new Date(new Date().toISOString()), 3).toISOString()

            // set key and expire time to the db
            const setKey = await usersCollection.updateOne({ email: email }, {
                $set: {
                    currentKey: key,
                    expireTime: expireTime
                }
            }, { upsert: false })

            // get user's profile data
            const profileData = {
                email: user.email,
                username: user.username,
                photo: user.photo,
                currentKey: key
            }

            client.close()
            // return user's data
            res.status(201).json({
                title: 'Successful Logon',
                message: 'You were logged in with success!',
                profile: profileData,
                data: userData
            })

            return
        } catch (error) {
            res.status(422).json({ 
                title: 'Error',
                message: 'Something went wrong, try again!'
            })

            return
        }
    }
}
