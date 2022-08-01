import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    // dir: 'output',
    format: 'umd',
    type: 'chunk',
    map: "sourceMap"
    // isEntry: true,
    // isDynamicEntry: false

  },
  plugins: [typescript(),]
};