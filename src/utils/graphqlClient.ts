import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql'
import config from 'temp/config'
const apiKey = config.sitecoreApiKey
const graphQLEndpoint = config.graphQLEndpoint
export const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, {
    headers: {
        sc_apikey: apiKey,
    },
})
