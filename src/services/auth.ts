import { auth } from './firebase';

export const getAuthHeaders = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
