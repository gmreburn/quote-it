module.exports = {
	purge: { content: ["./src/**/*.jsx"], enabled: true },
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
