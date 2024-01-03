export default () => {
  console.log('🛎 ', 'read json');
  const serviceAccountJSON = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);
  console.log('🛎 ', 'json parsed', !!serviceAccountJSON);
  console.log('🛎 ', 'projectId', serviceAccountJSON.project_id);

  return {
    serviceAccountJSON,
    projectId: serviceAccountJSON.project_id,
  }
}