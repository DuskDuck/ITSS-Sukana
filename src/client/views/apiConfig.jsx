// apiConfig.js

const isLocal = process.env.NODE_ENV=== 'development'; // Check if running in development mode
const API_ENDPOINT = isLocal ? process.env.REACT_APP_LOCAL_API : process.env.REACT_APP_ONLINE_API;

export default API_ENDPOINT;
