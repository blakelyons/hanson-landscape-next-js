/** @type {import('stylelint').Config} */
const config = {
    plugins: ["stylelint-tailwind-canonical-classes"],
    rules: {
        "tailwind-canonical-classes/apply": [
            true,
            {
                cssPath: "./src/app/globals.css",
            },
        ],
    },
};

export default config;
