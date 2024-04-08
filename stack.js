const Contentstack = require('contentstack')

const Stack = Contentstack.Stack({
    'api_key': process.env.API_KEY,
    'delivery_token': process.env.DELIVERY_TOKEN,
    'environment': "production",
    live_preview: {
        'preview_token': process.env.PREVIEW_TOKEN,
        enable: true,
        host: 'rest-preview.contentstack.com'
    },
})

module.exports = Stack;