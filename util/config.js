const config = {
    argvDefValues: {
        GREETING: 'Hello',
        WHO: 'You',
        COLOR: 'Pink',
        WIDTH: 400,
        HEIGHT: 500,
        SIZE: 100
    },
    encodingTypes: {
        BINARY: 'binary'
    },
    imageFormat: {
        JPEG: 'jpeg'
    },
    constant: {
        BASE_URL: 'https://cataas.com/cat/says/',
        ENCODING: 'encoding',
        GET: 'GET',
        ERROR: 'error',
        DATA: 'data',
        END: 'end',
        OUTPUT: './build/cat-card.jpg'
    },
    statusCode: {
        SUCCESS: 200
    }
};

module.exports = { config };