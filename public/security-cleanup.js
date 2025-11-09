/**
 * 🔒 SECURITY CLEANUP SCRIPT
 * This script removes sensitive user data from localStorage
 * that was inadvertently stored in earlier versions.
 * 
 * Deploy Date: November 10, 2025
 * Issues Fixed:
 * - User passwords and full user list exposed in localStorage
 * - Admin credentials visible in client-side code
 */

(function() {
  console.log('🔒 Running security cleanup...');
  
  try {
    // 1. Remove full user list (contains all passwords!)
    const removedUsers = localStorage.getItem('MATCANBAN_USERS');
    if (removedUsers) {
      localStorage.removeItem('MATCANBAN_USERS');
      console.log('✅ Removed MATCANBAN_USERS from localStorage');
    }
    
    // 2. Clean currentUser if it contains password
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser && currentUser.password) {
          // Remove password field
          const { password, ...safeUser } = currentUser;
          localStorage.setItem('currentUser', JSON.stringify(safeUser));
          console.log('✅ Removed password from currentUser');
        }
      } catch (e) {
        console.warn('Could not parse currentUser:', e);
      }
    }
    
    // 3. Force logout if user is admin (admin password was exposed)
    if (currentUserStr) {
      try {
        const currentUser = JSON.parse(currentUserStr);
        if (currentUser && (currentUser.role === 'Admin' || currentUser.email === 'admin@gmail.com')) {
          // Force logout for admin users
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          localStorage.removeItem('sessionToken');
          console.warn('⚠️ Admin user logged out for security - please login again with NEW password');
          
          // Redirect to login if on restricted page
          if (window.location.pathname.includes('admin')) {
            window.location.href = '/login';
          }
        }
      } catch (e) {
        console.warn('Could not check for admin user:', e);
      }
    }
    
    // 4. List what's left in localStorage (for verification)
    console.log('📊 Remaining localStorage keys:', Object.keys(localStorage).length);
    
    console.log('✅ Security cleanup completed successfully');
  } catch (error) {
    console.error('❌ Security cleanup error:', error);
  }
})();

