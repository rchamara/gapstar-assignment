const { config } = require('./config');
const https      = require('https');

/**
 * @function
 * 
 * Create request url with path staring value and query parameter values
 * 
 * @param {String} pathString 
 * @param {Object} queryParam
 * 
 * @returns {String} url 
 */
function getRequestRestEndPoint (pathString, queryParam) {
    try {
        return config.constant.BASE_URL + pathString
            + '?width=' + queryParam.width
            + '&height=' + queryParam.height
            + '&color=' + queryParam.color
            + '&s=' + queryParam.size
    } catch (e) {
        throw new Error('getRequestRestEndPoint error: ', e);
    }
}

/**
 * @function
 * 
 * GET request for given url and will return promises
 * use https as services to call rest end point
 * Will only resolve if service return success code {200}
 * otherwise reject 
 * so no need to handle error from interface
 * 
 * @param {String} url 
 * @returns Promises
 */
function get (url) {
    return new Promise((resolve, reject) => {
        try {
            const request = https.get(url, (res) => {
                let dataChunk = [];
                res.on(config.constant.DATA, (data) => {
                    dataChunk.push(data);
                }).on(config.constant.END, () => {
                    if (res.statusCode === config.statusCode.SUCCESS) {
                        resolve(Buffer.concat(dataChunk));
                    } else {
                        reject(res.statusCode);
                    }
                });
            });
            request.on(config.constant.ERROR, (e) => {
                reject(e);
            });
            request.end();
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getRequestRestEndPoint,
    get
};