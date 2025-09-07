const express = require('express')

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is currently running!')
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
})