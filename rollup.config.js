import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'src/slope.js',
	output: {
		sourcemap: true,
		format: 'cjs',
		name: 'app',
		file: 'dist/slope-engine.js'
	},
	plugins: [
		commonjs(),
		terser()
	]
}
