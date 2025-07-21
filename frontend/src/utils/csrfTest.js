// CSRF Test Utility
import { fetchCsrfCookie, getCsrfToken } from '../services/api';

export const testCsrfSetup = async () => {
  console.log('🔒 Testing CSRF Setup...');
  
  try {
    // 1. Check if CSRF cookie exists
    let token = getCsrfToken();
    console.log('Initial CSRF token:', token ? 'Found' : 'Not found');
    
    // 2. Fetch CSRF cookie
    console.log('Fetching CSRF cookie...');
    await fetchCsrfCookie();
    
    // 3. Check if token is now available
    token = getCsrfToken();
    console.log('CSRF token after fetch:', token ? 'Found' : 'Not found');
    
    if (token) {
      console.log('✅ CSRF setup successful!');
      console.log('Token preview:', token.substring(0, 20) + '...');
    } else {
      console.log('❌ CSRF setup failed - no token found');
    }
    
    return !!token;
  } catch (error) {
    console.error('❌ CSRF setup error:', error);
    return false;
  }
};
