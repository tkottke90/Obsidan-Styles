import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
import { basename, relative, extname } from 'path'
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

const scripts = [
  'scripts/createJournalEntry.js',
  'scripts/createProjectFolder.js',
  'scripts/createResourceFolderWTroubleshooting.js'
]

const legacyLib = [
  'string-utils.js',
  'obsidianUtils.js',
  'error-utils.js'
]

export default [
  // Dataview Components
  {
    input: Object.fromEntries(
      globSync('templates/Components/**/*.js').map(file => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        relative(
          'templates',
          file.slice(0, file.length - extname(file).length)
        ),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url))
      ])
    ),
    output: {
      dir: 'dist/templates'
    },
    plugins: [
      terser()
    ]
  },
  // Templater Scripts
  ...scripts.map(script => ({
    input: script,
    output: {
      file: `dist/scripts/${basename(script)}`
    },
    plugins: [
      commonjs(),
      terser(),
    ]
  })),
  // These are leftover from the previous implementation.  Want to maintain backwards compatibility
  ...legacyLib.map(lib => ({
    input: `scripts/lib/${lib}`,
    output: {
      file: `dist/scripts/lib/${lib}`
    }
  })),

];
