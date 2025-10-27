

const BACKEND_URL: string = import.meta.env.VITE_API_URL as string;

export const API_URL: string = BACKEND_URL || "http://localhost:5000";


export const BACKEND_URL_URL: string = BACKEND_URL;

export { BACKEND_URL }; 


export default BACKEND_URL;
