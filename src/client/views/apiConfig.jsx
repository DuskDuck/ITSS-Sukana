// apiConfig.js

const isLocal = process.env.NODE_ENV=== 'development'; 
const API_ENDPOINT = isLocal ? process.env.REACT_APP_LOCAL_API : '';

export default API_ENDPOINT;
