// use dotenv
require('dotenv').config();

const axios = require('axios');

const skins_url = 'http://192.168.178.66:4000/api/skins'
const skin_base_url = 'http://192.168.178.66:4000/api/skin/'

export default class SkinService {

    static async getSkins() {
        try {
            const response = await axios.get(skins_url);
            return response.data.items_list;
        } catch (error) {
            console.log(error);
        }
    }

    static async getSkinColors(icon_url) {
        try {
            const response = await axios.get(skin_base_url + icon_url + '/getColors');
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
}