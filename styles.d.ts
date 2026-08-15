// Allow importing CSS/SASS files in TypeScript files.
// Fixes: "Cannot find module or type declarations for side-effect import"
declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.sass';
declare module '*.module.sass';
