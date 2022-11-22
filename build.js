const esbuild = require('esbuild');
const {watch} = require('chokidar');


console.log(process.env.NODE_ENV);

build();

watch('./src/**/*.ts', {}).on('change', (path) => {
    console.log(`building... ${path}`);
    build();
});

function build() {
    esbuild.build({
        entryPoints: ['./src/app.ts'],
        bundle: true,
        sourcemap : true,
        target : 'es2015',
        minify : true,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(()=> console.log("Built!"))
        .catch(() => process.exit(1));
}