export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/stakient',
  },
  // cache: {
  //   ttl: parseInt(process.env.CACHE_TTL, 10) || 3600000, // 1 hour in milliseconds
  //   store: process.env.CACHE_STORE || 'memory', // or 'mongodb' for persistent cache
  //   mongoUri: process.env.CACHE_MONGO_URI || 'mongodb://localhost:27017/stakient-cache',
  // },
  // thirdPartyApis: {
  //   ethereum: {
  //     url: process.env.ETHEREUM_API_URL || 'https://api.ethereum.org/data',
  //     apiKey: process.env.ETHEREUM_API_KEY,
  //   },
  //   bnb: {
  //     url: process.env.BNB_API_URL || 'https://api.bnb.org/data',
  //     apiKey: process.env.BNB_API_KEY,
  //   },
  //   polygon: {
  //     url: process.env.POLYGON_API_URL || 'https://api.polygon.org/data',
  //     apiKey: process.env.POLYGON_API_KEY,
  //   },
  //   avalanche: {
  //     url: process.env.AVALANCHE_API_URL || 'https://api.avalanche.org/data',
  //     apiKey: process.env.AVALANCHE_API_KEY,
  //   },
  // },
});