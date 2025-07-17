/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /bg-.+/,
            variants: ['hover'],
        },
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px',
                sm: '640px',
                md: '780px',
                lg: '1024px',
                xl: '1288px',
                '2xl': '1536px',
            },
            colors: {
                'br-color': '#001623',
                'btn-text-color': '#001623',
                primary: '#F6F7F7',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
