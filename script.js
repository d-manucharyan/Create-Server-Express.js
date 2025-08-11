const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs').promises
const { setHeader } = require('./functions/setHeader')
app.listen(3000)

// poxancum enq homepage
app.get('/', (req, res) => {
    setHeader(res, 200)
    res.sendFile(path.join(__dirname, 'pages', 'index.html'))
})


app.get('/api/users', async (req, res) => {
    const users = JSON.parse(await fs.readFile(path.join(__dirname, 'db', 'users.json'), 'utf-8'))
    const name = req.query.name
    const sort = req.query.sort

    if (name) {           //anuni stugum
        const filterByName = users.filter(user => user.name.toLowerCase().indexOf(name.toLowerCase()) > -1)
        res.json(filterByName)
    } else if (sort && sort === 'minage') {      //tariqi stugum poqric meci hamar
        const ageMinToMax = users.toSorted((a, b) => a.age - b.age)
        setHeader(res, 200)
        res.json(ageMinToMax)
    } else if (sort && sort === 'maxage') {      //tariqi stugum poqric meci hamar
        const ageMaxToMin = users.toSorted((a, b) => b.age - a.age)
        setHeader(res, 200)
        res.json(ageMaxToMin)
    } else {                //mnacac depqeri hamar
        setHeader(res, 200)
        res.json(users)
    }
    //! ete query-ner@ &-ov grenq miajamanak kashxati te che
    //! vonc karanq anenq vor ayl query-neri depqum erori ej cuyc ta
})

app.get('/api/users/:id', async (req, res) => {      // konkret id-ov useri data
    const users = JSON.parse(await fs.readFile(path.join(__dirname, 'db', 'users.json'), 'utf-8'))
    const { id } = req.params
    const person = users.find(user => user.id == id)
    setHeader(res, 200)
    res.json(person)
})

app.delete('/api/users/:id', async (req, res) => {      //Delete harcum
    const users = JSON.parse(await fs.readFile(path.join(__dirname, 'db', 'users.json'), 'utf-8'))
    const { id } = req.params
    const personInd = users.findIndex(user => user.id == id)

    if (personInd != -1) {
        users.splice(personInd, 1)
        await fs.unlink(path.join(__dirname, 'db', 'users.json'))
        await fs.appendFile(path.join(__dirname, 'db', 'users.json'), JSON.stringify(users))
        res.json(users)
    } else {
        setHeader(res, 404)
        res.sendFile(path.join(__dirname, 'pages', 'errors.html'))
    }

})

app.use((req, res) => {
    setHeader(res, 404)
    res.sendFile(path.join(__dirname, 'pages', 'errors.html'))
})