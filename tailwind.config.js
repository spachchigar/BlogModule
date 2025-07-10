/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}', // for page route
        './components/**/*.{js,ts,jsx,tsx}', // your UI components
        './src/**/*.{js,ts,jsx,tsx}', // if your components live in /src
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px', // ➕ Add extra small
                sm: '640px', // ✅ default
                md: '780px', // ✅ default
                lg: '1024px', // ✅ default
                xl: '1288px', // ✅ default
                '2xl': '1536px', // ✅ default
            },
            colors: {
                'br-color': '#001623', // custom color name
                'btn-text-color': '#001623',
                primary: '#F6F7F7',
            },
        },
        plugins: [require('@tailwindcss/typography')],
    },
}
