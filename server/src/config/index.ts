import "./parse_env";
import auth from './auth';
import apps from './apps';
import endpoints from "./endpoints";

const config = {
    app_name: process.env.APP_NAME,
    app_port: process.env.APP_PORT,
    
    auth,
    apps,
    endpoints,
};

Object.freeze(config);
export default config;