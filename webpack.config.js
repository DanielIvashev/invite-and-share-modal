const path = require('path');

function resolve (dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            '@': resolve('src/')
        }
    }
};
