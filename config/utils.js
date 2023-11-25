const { stage_NAME, stage_AUTHOR, stage_VERSION, stage_DESCRIPTION, DEFAULT_PROFILE_ROOT, DEFAULT_ROUTE_ROOT, DEFAULT_ROUTE_ADMIN, PORT_SYSTEM, URL_OF_BACKEND, DEFAULT_PROFILE_ADMIN, DEFAULT_VALUE_APIKEY_BACKOFFICE, DEFAULT_PROFILE_OPERATOR, DEFAULT_ROUTE_OPERATOR } = require('./consts');
const { root, admin, operator } = require('./tabsidebase');
const moment = require('moment')
moment.locale("fr");

require('dotenv').config()


class Utils {

    constructor() {

    }

    static getEnvnow(req) {
        return req.app.settings.env
    }

    static getAxiosConfig() {
        return {
            headers: {
                'hmskey': DEFAULT_VALUE_APIKEY_BACKOFFICE
            }
        }
    }

    static getAxiosConfigWithToken(usertoken) {
        return {
            headers: {
                'hmskey': DEFAULT_VALUE_APIKEY_BACKOFFICE,
                'hmstoken': usertoken
            }
        }
    }

    static getUrlBackend() {
        return URL_OF_BACKEND
    }

    static getMoment() {
        return moment
    }

    static getTabSideBase(profile) {
        if (profile == DEFAULT_PROFILE_ROOT) {
            return root()
        }
        if (profile == DEFAULT_PROFILE_ADMIN) {
            return admin()
        }
        if (profile == DEFAULT_PROFILE_OPERATOR) {
            return operator()
        }
        return []
    }

    static getRouteDeBase(profile) {
        if (profile == DEFAULT_PROFILE_ROOT) {
            return DEFAULT_ROUTE_ROOT
        }
        if (profile == DEFAULT_PROFILE_ADMIN) {
            return DEFAULT_ROUTE_ADMIN
        }
        if (profile == DEFAULT_PROFILE_OPERATOR) {
            return DEFAULT_ROUTE_OPERATOR
        }
        return ""
    }


    static isInteger(value) {
        return typeof value === 'number' && Number.isInteger(value);
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isObject(value) {
        return value !== null && typeof value === 'object';
    }

    static isArray(value) {
        return value !== null && typeof value === 'object' && value.constructor === Array;
    }

    static isArrayOfString(value) {
        return Utils.isArray(value) && value.every(Utils.isString) && value.length > 0;
    }

    static isArrayOfObject(value) {
        return Utils.isArray(value) && value.every(Utils.isObject) && value.length > 0;
    }

    static isArrayOfInteger(value) {
        return Utils.isArray(value) && value.every(Utils.isInteger) && value.length > 0;
    }

    static isArrayOfNumber(value) {
        return Utils.isArray(value) && value.every(Utils.isNumber) && value.length > 0;
    }

    static isArrayOfBoolean(value) {
        return Utils.isArray(value) && value.every(Utils.isBoolean) && value.length > 0;
    }

    static isValidUrl(value) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
    }

    static validateServiceRoute(value) {
        const regex = /^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/g;
        return regex.test(value)
    }

    /**
     * 
     * @param {*} str 
     * @returns 
     */
    static removeExtraSpace(str) {
        //str = str.replace(/[\s]{1,}/g, ""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]{1,}/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]{1,}$/, ""); // Enlève les espaces à la fin
        return str;
    }

    static cleanBlank(str) {
        return String(str).split(' ').join('') || "NA"
    }

    /* static formatDate(str) {
        console.log(str);
        let ndate = new Date(str)
        return moment(ndate).format('YYYY-MM-DD')
    } */

    static formatDate(str) {
        return moment(str, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }

    static tokenIsValid(expiration) {
        let now = new Date()
        let exp = new Date(expiration)
        return now < exp
    }



}

module.exports = Utils