const express = require('express')

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is currently running!')
})

app.get('/get', async (req, res) => {
    const userId = req.query.userId
    const headshot = req.query.headshot === 'true' ? true : false

    if (headshot) {
        url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`
    } else {
        url = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png`
    }

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.data && data.data.length > 0) {
            const imageUrl = data.data[0].imageUrl
            res.send({success: true, imageUrl: imageUrl})
        } else {
            res.status(404).json({success: false, message: 'Error fetching imageUrl from given UserID.'})
        }
    } catch(error) {
        res.status(505).json({success: false, message: 'Error fetching imageUrl from given UserID.', error: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
})