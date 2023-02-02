/** @type {import('tailwindcss').Config} */
/** @type {@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {},
			fontSize: {
				'2xs': '0.625rem',
				'3xs': '0.5rem',
				'4xs': '0.375rem'
			},
			width: {
				125: '500px' //or 125rem
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			zIndex: {
				100: '100',
				1000: '1000'
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3840c7',
					'primary-200': '#383838',
					'primary-focus': '#012d8f',
					'primary-content': '#ffffff',
					secondary: '#000000',
					'secondary-focus': '#383838',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#3d4451',
					'neutral-500': '#737373',
					'base-100': '#ffffff',
					'base-200': '#f3f4fc',
					'base-300': '#e9f2f5',
					info: '#66c6ff',
					success: '#28bf92',
					warning: '#fcca00',
					grey: '#7e7e80',
					'grey-600': '#808080',
					error: '#e60000',
					'error-focus': '#b30202',
					'error-content': '#ffffff',
					'background-color': '#e9f2f5', //e9f2f5
					'.icon-info': {
						color: '#6b7280'
					},
					'.icon-primary': {
						color: '#3840c7'
					},
					//custom designs
					'.btn': {
						'text-transform': 'none'
					},
					'.btn-theme': {
						'border-radius': '6px',
						height: '40px',
						'font-weight': '600',
						'font-size': '14px'
					},
					'.btn-disabled': {
						cursor: 'not-allowed'
					}
					// '--rounded-box': '1rem', // border radius rounded-box utility class, used in card and other large boxes
					// '--rounded-btn': '0.5rem', // border radius rounded-btn utility class, used in buttons and similar element
					// '--rounded-badge': '1.9rem', // border radius rounded-badge utility class, used in badges and similar
					// '--animation-btn': '0.25s', // duration of animation when you click on button
					// '--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					// '--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					// '--border-btn': '1px', // border width of buttons
					// '--tab-border': '1px', // border width of tabs
					// '--tab-active-radius': '5rem', // border radius of tabs
					// '--tab-radius': '0.5rem' // border radius of tabs
				}
			},
			{
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					primary: '#3840c7',
					'primary-200': '#383838',
					'primary-focus': '#012d8f',
					'primary-content': '#ffffff',
					'base-100': '#000000',
					'background-color': '#24252b',
					'.icon-info': {
						color: '#b5b5b5'
					},
					'.icon-primary': {
						color: '#3840c7'
					}
				}
			}
		]
	},
	plugins: [require('daisyui')]
};

// primary: {
//   50: '#f2f9ff',
//   100: '#dee8f2',
//   200: '#91aae6',
//   300: '#69a4e0',
//   400: '#545acc',
//   500: '#3840c7',
//   600: '#1d57db',
//   700: '#0b49d6',
//   800: '#023cbf',
//   900: '#012d8f',
//   main: '#3840c7',
//   light: '#dee8f2',
//   dark: '#012d8f',
//   contrast: '#ffffff'
// },
