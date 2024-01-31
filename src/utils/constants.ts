let apiRoot = "";

// #trello : Uncaught ReferenceError: process is not defined
// https://github.com/vitejs/vite/issues/1973
console.log(import.meta.env);
console.log(process.env);

//Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = "http://localhost:4100";
}

if (process.env.BUILD_MODE === 'production') {
    apiRoot = "https://trello-be-zvnk.onrender.com";
}

export const API_ROOT = apiRoot;