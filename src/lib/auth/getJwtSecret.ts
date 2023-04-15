export default () => {
  return import.meta.env.VITE_JWT_SECRET as string;
};
