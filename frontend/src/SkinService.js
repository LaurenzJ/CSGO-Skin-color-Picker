// use dotenv
require('dotenv').config();

const axios = require('axios');

const SKINS_URL = 'http://localhost:4000/api/skins'
const SKIN_BASE_URL = 'http://localhost:4000/api/skin/'
const STICKER_URL = 'http://localhost:4000/api/stickers'
const STICKER_BASE_URL = 'http://localhost:4000/api/stickers/'

export default class SkinService {

    static async getSkins() {
        try {
            const response = await axios.get(SKINS_URL);
            return response.data.items_list;
        } catch (error) {
            console.log(error);
        }
    }

    static async getSkinColors(icon_url) {
        try {
            const response = await axios.get(SKIN_BASE_URL + icon_url + '/getColors');
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }

    static async getStickers() {
        try {
            const response = await axios.get(STICKER_URL);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }

    static async getStickersWithinColorRange(color_range) {
        try {
            const response = await axios.get(STICKER_BASE_URL+color_range);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
}