import axios from 'axios';

export default class Api {    

    getData = (url) => {
        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("error")
            })
    }

}