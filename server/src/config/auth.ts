const config = {
    private_key_file: process.env.PRIVATE_KEY_FILE,
    public_key: process.env.PUBLIC_KEY,
};

Object.freeze(config);
export default config;