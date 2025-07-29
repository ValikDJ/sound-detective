export const getAssetPath = (path: string) => {
  // import.meta.env.BASE_URL буде '/sound-detective/'
  // Якщо шлях починається з '/', видаляємо його, щоб уникнути подвійного слеша
  return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.substring(1) : path}`;
};