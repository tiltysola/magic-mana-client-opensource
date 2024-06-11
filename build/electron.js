const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const electron = require('electron-connect').server.create({
  stopOnClose: true,
});

const localPkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const input_dir = path.join(__dirname, '../src/main/background.ts');
const input_preload = path.join(__dirname, '../src/main/preload.ts');
const output_dir = path.join(__dirname, '../dist/main/background.js');

const common_config = {
  entryPoints: [input_dir, input_preload],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outdir: path.join(output_dir, '../'),
  external: Object.keys({
    ...(localPkgJson.dependencies || {}),
    ...(localPkgJson.devDependencies || {}),
    ...(localPkgJson.peerDependencies || {}),
  }),
};

if (process.env.NODE_ENV === 'production') {
  esbuild.build({
    ...common_config,
    define: {
      'process.env.ENV': "'production'",
    },
  });
} else {
  esbuild
    .build({
      ...common_config,
      define: {
        'process.env.ENV': "'development'",
        'process.env.PORT': '14843',
      },
      watch: {
        onRebuild: (err) => {
          if (err) console.error('[ESBuild] Rebuild failed!');
          else {
            electron.restart();
          }
        },
      },
    })
    .then(() => {
      electron.start();
    });
}
