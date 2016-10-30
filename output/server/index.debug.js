require('./libs');

global.ts=require('./libs/typescript.js');

System.config({
    packages: {
        '../../server': { main: 'main.ts', defaultExtension: 'ts', meta: { '*': { format: 'esm' } } },
        '../../common': {  defaultExtension: 'ts', meta: { '*': { format: 'esm' } } }
    },
    transpiler: 'typescript',
    baseURL: '',
    typescriptOptions: {
        resolveTypings: true,
        emitDecoratorMetadata: true,
        sourceMap: true,
        inlineSourceMap: true
    }
});
System.import('../../server');

