const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
app.use(cors());

const path = require('path')
const getColors = require('get-image-colors')
 
app.get('/api/skins', (req, res) => {
    console.log("YEE")
    try {
        var rawData = fs.readFileSync('./skins.json')
        var data = JSON.parse(rawData)
        res.send(data)
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/skin/:icon_url/getColors', async (req, res) => { 
    let icon_url = req.params.icon_url;
    let url = `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`
    try {
        const request = await axios.get(url, {
            responseType: "arraybuffer",
        });
        var buffer = Buffer.from(request.data);
        getColors(buffer, 'image/png').then(colors => {
            for (let i = 0; i < colors.length; i++) {
                const [r,g,b,a] = colors[i]['_rgb'];
                colors[i]['rgba'] = `rgba(${r},${g},${b},${a})`
                delete colors[i]['_rgb']
            }
            res.send(colors)
        })
    } catch (err) {
        throw err;
    }
    
    
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

