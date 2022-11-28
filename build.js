const esbuild = require('esbuild');
const { watch } = require('chokidar');

console.log(process.env.NODE_ENV);

build();

watch('./src/**/*.ts', {})
    .on('change', (path) => {
        build();
    });

function build() {
    console.log("building...");

    esbuild.build({
        entryPoints: ['./src/app.ts'],
        bundle: true,
        sourcemap : false,
        target : "ES2015",
        minify : true,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(() => console.log("Built!"))
        .catch(() => {
            console.log('Fail during build.')
            process.exit(1)
        });
}