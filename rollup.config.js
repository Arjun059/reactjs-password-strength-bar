import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'lib/index.tsx',
  output: {
    file: pkg.main,
    format: 'esm',
    exports: 'named',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    peerDepsExternal(),
    typescript({
      clean: true,
    }),
    resolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    process.env.NODE_ENV === 'production' && terser(),
    addUseClientDirective(),
  ],
};

function addUseClientDirective() {
  return {
    name: 'add-use-client',
    renderChunk(code) {
      if (code.includes('"use client"')) return code; // already present
      return `"use client";\n${code}`;
    },
  };
}
