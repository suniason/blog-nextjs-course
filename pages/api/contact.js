import { MongoClient } from 'mongodb'

async function handler(req, res) {
  const { email, name, message } = req.body
  let client
  const connectionString = `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_pass}@${process.env.mongodb_cluster}.qtivnfr.mongodb.net/${process.env.mongodb_db}?retryWrites=true&w=majority`

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim === '' ||
    !message ||
    message.trim === ''
  )
    res.status(422).json({ message: 'Invalid Input' })

  const newMessage = {
    email,
    name,
    message,
  }

  try {
    client = await MongoClient.connect(connectionString)
  } catch (error) {
    res.status(500).json({ message: 'Could not Connect to database' })
  }

  const db = client.db()
  try {
    const result = await db.collection('messages').insertOne(newMessage)
    newMessage.id = result.insertedId
  } catch (error) {
    client.close()
    res.status.json({ message: 'Storing data failed' })
    return
  }

  client.close()

  res.status(201).json({ message: 'Success', message: { newMessage } })
}

export default handler
