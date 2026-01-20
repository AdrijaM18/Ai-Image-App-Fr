// auth/auth.js
import { fetchAuthSession } from 'aws-amplify/auth';

export async function getIdToken() {
  try {
    // forceRefresh: true will get a new token if expired
    const session = await fetchAuthSession({ forceRefresh: true });
    
    const idToken = session.tokens?.idToken?.toString();
    
    if (!idToken) {
      throw new Error('No ID token found');
    }
    
    console.log('ID Token retrieved successfully');
    return idToken;
  } catch (error) {
    console.error('Error getting ID token:', error);
    throw error;
  }
}