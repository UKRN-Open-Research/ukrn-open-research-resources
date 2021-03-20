// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // options...
    devServer: {
        proxy: {
            '/.netlify': {
                target: 'http://localhost:9000',
                pathRewrite: { '^/.netlify/functions': '' },
            },
        },
    }
}
