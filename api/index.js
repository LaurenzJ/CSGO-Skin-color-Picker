const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
app.use(cors());

const path = require('path')
const getColors = require('get-image-colors')
const namer = require('color-namer')
const FastAverageColor = require('fast-average-color')

 
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
app.get("/api/stickers/get/:color_range", (req, res) => { // return stickers within the color range
    
    var color_range = req.params.color_range
    var selectedStickers = []
    try {
        var rawData = fs.readFileSync('./stickers.json')
        var stickers = JSON.parse(rawData)
        console.log(stickers[0]['colors'].length)
        // go through each sticker
        for (let i = 0; i < stickers.length; i++) {
            // go through each color
            for (let j = 0; j < 1; j++) {
                console.log(stickers[i]['colors'][j])
                // if the color is within the color range
                // if (stickers[i]['colors'][j]['rgba'] >= color_range[0] && stickers[i]['colors'][j]['rgba'] <= color_range[1]) {
                // if(stickers[i]['colors'][j]['rgba'] == color_range) {
                //     // add the sticker to the selectedStickers array
                //     selectedStickers.push(stickers[i])
                // }
            }
        }

        // for(var i = 0; i < stickers.length; i++) {
        //     for(var j = 0; j < stickers[0]['colors'].length; j++) {
        //         if(stickers[i]['colors'][j] == color_range) {
        //             selectedStickers.push(stickers[i])
        //         }
        //     }
        // }
        res.send(selectedStickers)
    } catch (error) {
        console.log(error);
    }
});

// ---

// needs to be tested ---
app.get('/api/stickers/update_colors', async (req, res) => { 
    // crown
    // var url = `https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROWEXTTOG_xJ2cUE97MgposLWsJ0k3hPCbKTtHuozixtaOkqesZ73Vw2gJ7sBy2uqXrdz22wDmrkNpZG3wOsbLJQKoqBqM`
    
    // ibp
    var url = `https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYv7iwMhdvxPbaTjVN4NP4loSOwqOjMb2HxzICvpMpjOqUotWijgDmr0FkazqlIIPBd1JqZQ2E80_-n7mPlWLmXg`
    try {
        const request = await axios.get(url, {
            responseType: "arraybuffer",
        });
        var options = {
            count: 2,
            type: 'image/png'
        }
        var buffer = Buffer.from(request.data);
        getColors(buffer, options).then(colors => {
            for (let i = 0; i < colors.length; i++) {
                const [r,g,b,a] = colors[i]['_rgb'];
                colors[i]['rgba'] = `rgba(${r},${g},${b},${a})`
                delete colors[i]['_rgb']
                // const [r,g,b,a] = color
                color_name = namer(`rgb(${r},${g},${b})`, { distance: 'deltaE' })
                colors[i]['name'] = color_name['basic']
                // console.log(color_name['basic'][0]['name'] + " " + color)
            }
            res.send(colors)
        })
    } catch (err) {
        throw err;
    }
    


    //  // color namer works fine (i suppose :) )
    // const [r,g,b,a] = color
    // color_name = namer(`rgb(${r},${g},${b})`, {
    //     pick: ['basic']
    // })
    // console.log(color_name['basic'][0]['name'] + " " + color)
});
// ---

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

