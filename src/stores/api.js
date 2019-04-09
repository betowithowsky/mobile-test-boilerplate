import axios from 'axios';

var _codeBrand = '';
var _codeModel = '';
var _codeYearModel = '';

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

    getModelsCars() {

        let codeBrand = this.getBrandModels();

        return axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codeBrand}/modelos`)
            .then(response => {
                return response.data.modelos;
            })
            .catch(error => {
                console.log("error")
            })
    }

    getYearModelsCars(BrandCode) {
        let codeBrand = this.getBrandModels();
        let codeModel = this.getCodeModels();

        return axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codeBrand}/modelos/${codeModel}/anos`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("error")
            })
    }

    getPriceModelsCars(BrandCode) {

        let codeBrand = this.getBrandModels();
        let codeModel = this.getCodeModels();
        let codeYearModel = this.getYearModels();

        return axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${codeBrand}/modelos/${codeModel}/anos/${codeYearModel}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("error")
            })
    }

    setBrandModels(code){
        const _codeBrand = code; 
    }

    getBrandModels(){
        return _codeBrand ;
    }

    setCodeModels(code){
        const _codeModel = code; 
    }

    getCodeModels(){
        return _codeModel;
    }

    setYearModels(code){
        const _codeYearModel = code; 
    }

    getYearModels(){
        return _codeYearModel;
    }

}