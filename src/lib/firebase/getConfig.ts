export default () => {
  const serviceAccountJSON = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);

  return {
    serviceAccountJSON,
    projectId: serviceAccountJSON.project_id,
  }
}