const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

app.use(express.json())

const institutes = {
    'BVRITH': 'Bachupally',
    'BVRITN': 'Narsapur',
    'VIT': 'Bhimavaram',
    'SVECW': 'bhimavaram',
}

app.get('/location', async (req, res) => {
    const peopleRef = db.collection('users').doc('jU7W5T78RK3R82pLDWWU')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

app.get('/location/:name', (req, res) => {
    const { name } = req.params
    if (!name || !(name in institutes)) {
        return res.sendStatus(404)
    }
    res.status(200).send({ [name]: institutes[name] })
})

app.post('/addlocation', async (req, res) => {
    const { name, status } = req.body
    const peopleRef = db.collection('users').doc('jU7W5T78RK3R82pLDWWU')
    const res2 = await peopleRef.set({
        [name]: status
    }, { merge: true })
    // friends[name] = status
    res.status(200).send(institutes)
})

app.patch('/changelocation', async (req, res) => {
    const { name, newStatus } = req.body
    const peopleRef = db.collection('users').doc('jU7W5T78RK3R82pLDWWU')
    const res2 = await peopleRef.set({
        [name]: newStatus
    }, { merge: true })
    // friends[name] = newStatus
    res.status(200).send(institutes)
})

app.delete('/location', async (req, res) => {
    const { name } = req.body
    const peopleRef = db.collection('users').doc('jU7W5T78RK3R82pLDWWU')
    const res2 = await peopleRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(institutes)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
