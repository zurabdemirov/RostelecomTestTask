import axios from "axios";

import {formatQuery} from "../helpers/query";

const BASE_URL = 'http://www.filltext.com/?';

export const usersAPI = {
    getUsers: async (query) => {
        const {data} = await axios.get(`${BASE_URL}${formatQuery(query)}`);
        return data;
    }
};
