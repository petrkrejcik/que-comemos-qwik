export default () => {
  return process.env.VITE_JWT_SECRET as string;
};
