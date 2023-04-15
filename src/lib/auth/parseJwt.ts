export default (token: string) => {
  const { groupId, user_id: userId } = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  /**
   * @todo This is a potential risk because a user can pass whatever groupId and userId they want. The token should be verified with firebase.
   */
  return { groupId, userId } as { groupId: string; userId: string };
};
