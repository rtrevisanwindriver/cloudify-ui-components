const moduleResolverPlugin = [
    'module-resolver',
    {
        root: ['./src']
    }
];

module.exports = {
    plugins: [moduleResolverPlugin],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    env: {
        test: {
            plugins: [moduleResolverPlugin, 'require-context-hook']
        }
    }
};
