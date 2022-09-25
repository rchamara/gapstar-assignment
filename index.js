'use strict'

const { writeFile } = require('fs');
const { join }      = require('path');
const { config }    = require('./util/config');
const blend         = require('@mapbox/blend');
const argv          = require('minimist')(process.argv.slice(2));
const { 
    getRequestRestEndPoint, 
    get 
} = require('./util/helper'); 

/**
 * !IMPORTANT :request package
 * This package has been deprecated, so instead using request used https npm package
 * see more: https://github.com/request/request/issues/3142
 */

 
const {
    greeting = config.argvDefValues.GREETING,
    who = config.argvDefValues.WHO,
    color = config.argvDefValues.COLOR,
    width = config.argvDefValues.WIDTH,
    height = config.argvDefValues.HEIGHT,
    size = config.argvDefValues.SIZE
} = argv;

const queryParam = { width, height, size, color };

/**
 * Get the url with given query parameter and string parameters
 */
const firstRequestURL  = getRequestRestEndPoint(greeting, queryParam);
const secondRequestURL = getRequestRestEndPoint(who, queryParam);

/**
 * Two GET request for given url
 * Will return promises
 */
const firstRes = get(firstRequestURL);
const secondRes = get(secondRequestURL);

/**
 * @callback
 * 
 * Callback function for blend function
 * Will create new file in output folder if blend return data array
 * Otherwise will log the error
 * 
 * @param {object} error 
 * @param {Array} data 
 */
const blendCallBack = (error, data) => {
    if (data) {
        const fileOut = join(process.cwd(), config.constant.OUTPUT);
        writeFile(fileOut, data, config.encodingTypes.BINARY, (e) => {
            if (e) {
                console.error(e);
                return;
            }
            console.log('File created in '+config.constant.OUTPUT+ ' successfully !');
        });
    } else {
        console.error(error);
        return;
    }
}

/**
 * @callback
 * 
 * Callback function for promises all
 * Will only call when all promises resolve successfully
 * 
 * @param {Array} result 
 */
const promisesCallBack = result => {
    if (result && result.length != 2) {
        return;
    }
    /**
     * !IMPORTANT 
     * Buffer() is deprecated due to security and usability issues
     * used Buffer.from() 
     */
    const outputOptions = {
        width: width * 2, 
        height: height, 
        format: config.imageFormat.JPEG 
    }
    const firstImageBuffer = { 
        buffer: new Buffer.from(result[0], config.encodingTypes.BINARY), 
        x: 0, 
        y: 0 
    };
    const secondImageBuffer = { 
        buffer: new Buffer.from(result[1], config.encodingTypes.BINARY), 
        x: width, 
        y: 0 
    }
    blend(
        [firstImageBuffer, secondImageBuffer],
        outputOptions,
        blendCallBack);
}

/**
 * Use promise all for wait until both request get success
 * if one or both request has been failed we log the error
 */
Promise.all([firstRes, secondRes])
.then(promisesCallBack)
.catch((e) => { console.error(e); });
