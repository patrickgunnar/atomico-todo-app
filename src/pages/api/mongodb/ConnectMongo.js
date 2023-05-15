import { MongoClient } from "mongodb"


// connect to mongo cluster
const ConnectMongo = async () => {
    return await MongoClient.connect(
        `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.jdbjh0i.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    )
}

export default ConnectMongo
