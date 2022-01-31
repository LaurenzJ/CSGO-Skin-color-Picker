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

app.get("/api/stickers", (req, res) => {
    try {
        var rawData = fs.readFileSync('./stickers.json')
        var data = JSON.parse(rawData)
        res.send(data)
    } catch (error) {
        console.log(error);
    }
});
// needs to be tested ---
app.get("/api/stickers/:color_range", (req, res) => { // return stickers within the color range
    var color_range = req.params.color_range
    var selectedStickers = []
    try {
        var rawData = fs.readFileSync('./stickers.json')
        var stickers = JSON.parse(rawData)
        for(var i = 0; i < stickers.length; i++) {
            if(stickers[i]['colors'] WITHIN color_range){
                selectedStickers.push(stickers[i])
            }
        }
        res.send(selectedStickers)
    } catch (error) {
        console.log(error);
    }
});
// ---

// needs to be tested ---
app.get('/api/stickers/setColors', async (req, res) => { 
    var rawData = fs.readFileSync('./stickers.json')
    var stickers = JSON.parse(rawData)
    for(var i = 0; i < stickers.length; i++) {
        let icon_url = stickers[i].icon_url;
        let url = `https://steamcommunity-a.akamaihd.net/economy/image/${icon_url}`
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
            stickers[i]['colors'] = colors;
            fs.writeFileSync('./stickers.json', stickers)
        })
    }  
    
});
// ---

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

