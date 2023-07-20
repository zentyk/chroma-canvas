const esbuild = require("esbuild");

const { watch } = require('chokidar');

let mode = process.env.NODE_ENV || 'development';

function prodBuild() {
    esbuild.build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        sourcemap : false,
        target : "ES2015",
        minify : true,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(() => {
            console.log("Built!")
            process.exit(0)
        })
        .catch(() => {
            console.log('Fail during build.')
            process.exit(1)
        });
}

function devBuild() {
    esbuild.build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        sourcemap : true,
        target : "es2015",
        minify : false,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(() => console.log("Built!"))
        .catch(() => {
            console.log('Fail during build.')
            process.exit(1)
        });
}

if (mode === 'development') {
    console.log('Development mode');
    devBuild();
    watch('./src/**/*.ts', {})
        .on('change', () => {
            if(mode === 'development') {
                devBuild();
            } else {
                prodBuild();
            }
        });
} else {
    console.log('Production mode');
    prodBuild();
}