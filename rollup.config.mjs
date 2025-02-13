import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import { extname, relative, basename } from 'path';
import { fileURLToPath } from 'node:url';
import terser from '@rollup/plugin-terser';

function createInputEntries(sourceDir) {
  return Object.fromEntries(
    globSync(`${sourceDir}/**/*.ts`, { ignore: ['**/*.d.ts', '**/test/*.spec.ts'] }).map(file => [
      // This remove `src/` as well as the file extension from each
      // file, so e.g. src/nested/foo.js becomes nested/foo
      basename(file, extname(file)),
      // This expands the relative paths to absolute paths, so e.g.
      // src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url))
    ])
  );
}

function getPlugins() {
  const plugins = [typescript()]

  if (process.env.ENV !== 'dev') {
    plugins.push(terser())
  }

  return plugins;
}

// rollup.config.mjs
export default {
  input: createInputEntries('./ts-src'),
  output: {
    dir: './dist/scripts',
    entryFileNames: '[name].js',
    format: 'cjs',
  },
  plugins: getPlugins()
}