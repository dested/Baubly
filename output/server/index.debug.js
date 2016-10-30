require('./libs');

global.ts=require('./libs/typescript.js');

System.config({
    packages: {
        '../../server': { main: 'serverMain.ts', defaultExtension: 'ts', meta: { '*': { format: 'esm' } } },
        '../../common': {  defaultExtension: 'ts', meta: { '*': { format: 'esm' } } }
    },
    packageConfigPaths: ['./node_modules/*/package.json'],
    paths: {
        "*": "./node_modules/*"
    },

    transpiler: 'typescript',
    typescriptOptions: {
        "module": "system",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "removeComments": false,
        "target": "es5",
        "sourceMap": true,
        "inlineSourceMap": true
    }
});
System.import('../../server');

