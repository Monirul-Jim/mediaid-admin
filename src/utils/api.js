// --------------Config env process--------------//
export const base_api_url = import.meta.env.VITE_API_URI;
export const C_UPLOAD_PRESET = import.meta.env.VITE_C_UPLOAD_PRESET;
export const C_CLOUD_NAME = import.meta.env.VITE_C_CLOUD_NAME;
export const C_CLOUD_API_KEY = import.meta.env.VITE_C_CLOUD_API_KEY;

if (!base_api_url || !C_UPLOAD_PRESET || !C_CLOUD_API_KEY || !C_CLOUD_NAME) {
  throw new Error("Env Not Config !");
}
