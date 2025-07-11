import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';
const sitecoreApiHost = config.sitecoreApiHost;
const apiKey = config.sitecoreApiKey;
export const graphQLClient = new GraphQLRequestClient(
  `https://sc106sc.dev.local/sitecore/api/graph/edge`,
  {
    headers: {
      sc_apikey: apiKey,
    },
  }
);