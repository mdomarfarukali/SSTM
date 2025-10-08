module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Include React files
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FAD0C9',    // Soft pink
        white: '#FFFFFF',   // White color
        accent: '#FFC0CB',  // Accent pink
        beige: {
          100: "#f5f5dc",
          200: "#f0e6d2",
          300: "#e6dcc7",
        }  
      },
    },
  },
  plugins: [],
}
