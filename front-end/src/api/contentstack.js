import Contentstack from 'contentstack'

export const Stack = Contentstack.Stack({
    'api_key': process.env.REACT_APP_API_KEY,
    'delivery_token': process.env.REACT_APP_DELIVERY_TOKEN,
    'environment': "production",
    live_preview: {
        preview_token: process.env.REACT_APP_PREVIEW_TOKEN,
        enable: true,
        host: 'rest-preview.contentstack.com'
    },
})

