module.exports = api => {
    const env = api.env();
    const testEnvironment = env === 'test';

    return {
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    root: ['./src']
                }
            ],
            testEnvironment && 'require-context-hook',
            '@babel/proposal-class-properties'
        ].filter(Boolean),
        presets: [
            [
                '@babel/preset-env',
                {
                    // Disables transpiling modules to CommonJS outside of tests
                    // https://babeljs.io/docs/en/babel-preset-env#modules
                    modules: testEnvironment ? 'auto' : false,
                    loose: true
                }
            ],
            '@babel/preset-react',
            '@babel/preset-typescript'
        ]
    };
};
