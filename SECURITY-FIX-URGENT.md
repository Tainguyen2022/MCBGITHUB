# 🚨 SECURITY VULNERABILITY - URGENT FIX REQUIRED

**Reported:** November 10, 2025, 12:56 AM  
**Severity:** CRITICAL  
**Status:** ⚠️ ACTIVE VULNERABILITY

---

## 🔴 Problem

**User data including PLAIN TEXT PASSWORDS is exposed in localStorage and visible in DevTools.**

### Evidence from Production (matcanban.com):
```javascript
MATCANBAN_USERS = [
  {
    "id": "user_1",
    "name": "Trương Ngọc Thảo",
    "email": "thao.2ms@gmail.com",
    "password": "123",  // ⚠️ PLAIN TEXT PASSWORD!
    "role": "Premium",
    "packages": [...],
    "bananaBalance": 30
  },
  {
    "id": "user_2",
    "name": "Nguyễn Văn B",
    "email": "premium_user@example.com",
    "password": "123",  // ⚠️ PLAIN TEXT PASSWORD!
    ...
  }
]
```

---

## 🔍 Root Cause

### File: `services/userService.ts`

**Multiple locations storing full user data with passwords:**

1. **Line 155** - `getUsers()`:
   ```typescript
   saveData(LOCAL_STORAGE_KEYS.USERS, apiUsers);
   ```

2. **Line 313** - `loginUser()`:
   ```typescript
   saveData(LOCAL_STORAGE_KEYS.USERS, users);
   ```

3. **Line 369-370** - `registerUser()`:
   ```typescript
   users.push(apiUser);
   saveData(LOCAL_STORAGE_KEYS.USERS, users);
   ```

4. **Line 397-409** - `registerUser()` localStorage fallback:
   ```typescript
   const newUser: User = {
     ...
     password: password,  // ⚠️ Storing plain text password
     ...
   };
   saveData(LOCAL_STORAGE_KEYS.USERS, updatedUsers);
   ```

### File: `contexts/AuthContext.tsx`

**Line 44** - Storing current user (may include password):
```typescript
localStorage.setItem('currentUser', JSON.stringify(user));
```

---

## ⚡ IMMEDIATE ACTIONS REQUIRED

### 1. Stop Storing User List in localStorage (HIGHEST PRIORITY)

**Remove all instances of:**
```typescript
saveData(LOCAL_STORAGE_KEYS.USERS, users);
```

**Reason:** Client-side NEVER needs full user list. Only admins need this, and it should ONLY come from API with admin authentication.

### 2. Remove Passwords from Client Data

**Before storing any user object, remove password:**
```typescript
const { password, ...userWithoutPassword } = user;
localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
```

### 3. Admin-Only API Access

**User list should ONLY be accessed via:**
- Backend API with admin authentication
- NEVER cached in localStorage
- NEVER sent to client unless admin is authenticated

---

## 🛠️ SOLUTION

### Step 1: Update `userService.ts`

```typescript
// Remove password before storing ANY user data
const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...safeUser } = user;
  return safeUser;
};

// Update getUsers() - DON'T cache in localStorage
export const getUsers = async (adminKey?: string): Promise<User[]> => {
  const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY || '01111110';
  
  try {
    const { data: apiUsers, error } = await callAPI<User[]>('/api/users', {
      headers: { 'X-Admin-Key': adminKeyToUse },
    });
    if (!error && apiUsers && Array.isArray(apiUsers)) {
      // ❌ REMOVE THIS LINE - DON'T cache user list
      // saveData(LOCAL_STORAGE_KEYS.USERS, apiUsers);
      return apiUsers;
    }
  } catch (error) {
    console.error('Failed to fetch users from API:', error);
    throw new Error('Unable to fetch users - API required');
  }
  
  // ❌ REMOVE localStorage fallback for production
  throw new Error('User list only available via API');
};

// Update loginUser() - remove password before caching
export const loginUser = async (email?: string, password?: string): Promise<User> => {
  // ... existing code ...
  
  if (!apiError && apiUser) {
    // Remove password before storing
    const { password, ...userWithoutPassword } = apiUser;
    
    // ❌ DON'T update user list cache
    // Just return the sanitized user
    return userWithoutPassword as User;
  }
  
  // ... rest of code ...
};

// Update registerUser() - don't store password
export const registerUser = async (name?: string, email?: string, password?: string): Promise<User> => {
  // ... existing code ...
  
  if (!apiError && apiUser) {
    // Remove password before returning
    const { password, ...userWithoutPassword } = apiUser;
    
    // ❌ DON'T update localStorage user list
    return userWithoutPassword as User;
  }
  
  // ❌ REMOVE localStorage fallback entirely for production
  throw new Error('Registration requires API connection');
};
```

### Step 2: Update `AuthContext.tsx`

```typescript
const login = (user: User) => {
  // Remove password before storing
  const { password, ...safeUser } = user;
  setCurrentUser(safeUser as User);
  localStorage.setItem('currentUser', JSON.stringify(safeUser));
};

useEffect(() => {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    try { 
      const user = JSON.parse(stored);
      // Ensure no password in stored data
      const { password, ...safeUser } = user;
      setCurrentUser(safeUser as User);
      // ... rest of sync code ...
    } catch {}
  }
}, []);
```

### Step 3: Clear Existing LocalStorage

**Create cleanup script:**
```typescript
// public/security-cleanup.js
(() => {
  // Remove sensitive data
  localStorage.removeItem('MATCANBAN_USERS');
  
  // Clean current user if it has password
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      const user = JSON.parse(currentUser);
      if (user.password) {
        const { password, ...safeUser } = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
      }
    } catch {}
  }
  
  console.log('✅ Security cleanup completed');
})();
```

**Add to index.html:**
```html
<script src="/security-cleanup.js"></script>
```

---

## 🎯 DEPLOYMENT PLAN

### Phase 1: Immediate (Deploy NOW)
1. ✅ Add cleanup script to index.html
2. ✅ Deploy to production immediately
3. ✅ This will clean all users' localStorage on next visit

### Phase 2: Code Fix (Deploy within 24 hours)
1. ✅ Update `userService.ts` to NEVER store password
2. ✅ Update `AuthContext.tsx` to sanitize before storage
3. ✅ Remove ALL localStorage caching of user lists
4. ✅ Test thoroughly
5. ✅ Deploy to production

### Phase 3: Verification
1. ✅ Check production DevTools - MATCANBAN_USERS should be gone
2. ✅ Check currentUser - should NOT have password field
3. ✅ Verify admin panel still works (fetches from API)
4. ✅ Verify login/register still works

---

## 📊 Impact

### Who is Affected:
- **ALL users** - Their email, password, and personal data is visible in DevTools
- **79 production users** currently exposed

### What Data is Exposed:
- ✅ Email addresses
- ✅ Plain text passwords
- ✅ Names
- ✅ Account roles (Premium/Free)
- ✅ Package subscriptions
- ✅ Banana balances
- ✅ Join dates, expiry dates

### Risk Level:
- **CRITICAL** - Any user can open DevTools and see all other users' passwords
- **IMMEDIATE ACTION REQUIRED**

---

## ✅ CHECKLIST

- [ ] Deploy security cleanup script (Phase 1)
- [ ] Update `userService.ts` (Phase 2)
- [ ] Update `AuthContext.tsx` (Phase 2)
- [ ] Remove `USERS` from localStorage constants (Phase 2)
- [ ] Test locally
- [ ] Deploy Phase 2 to production
- [ ] Verify in production DevTools
- [ ] Notify affected users to change passwords
- [ ] Document incident

---

## 📝 Post-Fix Actions

1. **Password Reset Campaign:**
   - Send email to all 79 users
   - Request password change
   - Explain security improvement

2. **Security Audit:**
   - Review ALL localStorage usage
   - Ensure no other sensitive data is stored
   - Implement encryption for necessary client-side storage

3. **Monitoring:**
   - Add logging for data access patterns
   - Monitor for unusual activity
   - Set up security alerts

---

**CRITICAL: This fix must be deployed IMMEDIATELY.**

User reported: November 10, 2025  
Fix deadline: November 10, 2025 (same day)

