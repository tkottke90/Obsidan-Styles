import typescript from '@rollup/plugin-typescript';
import { globSync } from 'glob';
import { extname, relative, basename, dirname } from 'path';
import { fileURLToPath } from 'node:url';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import ts from 'typescript';

function createInputEntries(sourceDir) {
  return Object.fromEntries(
    globSync(`${sourceDir}/**/*.ts`, { ignore: ['**/*.d.ts', '**/test/*.spec.ts', `${sourceDir}/Views/**/*.ts`] }).map(file => [
      // This remove `src/` as well as the file extension from each
      // file, so e.g. src/nested/foo.js becomes nested/foo
      basename(file, extname(file)),
      // This expands the relative paths to absolute paths, so e.g.
      // src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url))
    ])
  );
}

function getPlugins(includeViewsCopy = false) {
  const plugins = [typescript()];

  if (includeViewsCopy) {
    plugins.push(
      copy({
        targets: [
          // Copy and transpile view.ts files
          {
            src: 'ts-src/Views/**/view.ts',
            dest: 'dist/scripts/Views',
            rename: (name, extension, fullPath) => {
              const match = fullPath.match(/Views\/(.+)\/view\.ts/);
              if (match) {
                return `${match[1]}/view.js`;
              }
              return `${name}.js`;
            },
            transform: (contents) => {
              // Transpile TypeScript to JavaScript for DataView scripts
              const result = ts.transpileModule(contents.toString(), {
                compilerOptions: {
                  module: ts.ModuleKind.None,
                  target: ts.ScriptTarget.ES2020,
                  removeComments: false,
                }
              });
              
              // Remove import statements and module code as they won't work in DataView context
              return result.outputText
                .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
                .replace(/^export\s*\{\s*\};?\s*$/gm, '') // Remove empty export statements
                .replace(/^"use strict";\s*$/gm, '') // Remove use strict
                .replace(/^Object\.defineProperty\(exports,.*$/gm, ''); // Remove exports definition
            }
          },
          // Copy CSS files
          {
            src: 'ts-src/Views/**/view.css',
            dest: 'dist/scripts/Views',
            rename: (name, extension, fullPath) => {
              const match = fullPath.match(/Views\/(.+)\/view\.css/);
              if (match) {
                return `${match[1]}/view.css`;
              }
              return `${name}.${extension}`;
            }
          }
        ]
      })
    );
  }

  if (process.env.ENV !== 'dev') {
    plugins.push(terser());
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
  plugins: getPlugins(true)
};