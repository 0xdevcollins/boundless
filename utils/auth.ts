export const logoutUser = async (redirectToLogin: () => void) => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      // Clear client-side auth data
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_token');

      // Call the redirect function instead of using router.push directly
      redirectToLogin();
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
