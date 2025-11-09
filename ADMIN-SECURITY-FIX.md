# 🚨 ADMIN SECURITY VULNERABILITY - CRITICAL

**Reported:** November 10, 2025, 1:00 AM  
**Severity:** CRITICAL  
**Status:** ⚠️ ACTIVE - IMMEDIATE ACTION REQUIRED

---

## 🔴 Problem

**Admin credentials and admin key are HARDCODED and exposed in multiple places:**

### 1. Admin Key Hardcoded: `01111110`

**Found in client-side code:**
```typescript
// services/userService.ts - Line 145, 483, 863
const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY || '01111110';
```
⚠️ **Anyone can see this in DevTools/source code!**

### 2. Admin Account in Database:
```
Email: admin@gmail.com
Password: 01111110  (PLAIN TEXT!)
```

### 3. All Admin Transactions Exposed:
```sql
-- Every admin action has the key visible
admin_panel	01111110	2025-11-07 03:57:40
```

---

## ⚡ IMMEDIATE FIXES REQUIRED

### Fix 1: Remove Hardcoded Admin Key from Client Code

**File:** `services/userService.ts`

**BEFORE (Lines 145, 483, 863):**
```typescript
const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY || '01111110';
```

**AFTER:**
```typescript
// ❌ NEVER include fallback admin key in client code
const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;

if (!adminKeyToUse) {
  throw new Error('Admin key required. Please set VITE_ADMIN_KEY environment variable.');
}
```

### Fix 2: Change Admin Password IMMEDIATELY

**Backend:** `server.js` (Line 461)

**BEFORE:**
```javascript
const adminPassword = '01111110';
```

**AFTER:**
```javascript
// Use environment variable - NEVER hardcode
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  throw new Error('ADMIN_PASSWORD environment variable is required');
}
```

### Fix 3: Update Admin Key Validation

**Backend:** `server.js` (Line 513)

**BEFORE:**
```javascript
if (adminKey && adminKey === (process.env.ADMIN_KEY || '01111110'))
```

**AFTER:**
```javascript
const ADMIN_KEY = process.env.ADMIN_KEY;
if (!ADMIN_KEY) {
  throw new Error('ADMIN_KEY environment variable is required');
}

if (adminKey && adminKey === ADMIN_KEY)
```

### Fix 4: Change Admin Account Password in Database

**SQL Command:**
```sql
-- Update admin password (use bcrypt hash in production!)
UPDATE users 
SET password = '$2b$10$NEW_HASHED_PASSWORD_HERE' 
WHERE email = 'admin@gmail.com';
```

---

## 🔐 NEW SECURE SETUP

### 1. Generate Strong Keys

```bash
# Generate new admin key (32 characters, alphanumeric + symbols)
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
# Example output: "K8mP3vN7qR2wX9zY5tU1eS6"

# Generate new admin password
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
# Example output: "L9nQ4wP8rT3yX1zA7"
```

### 2. Set Environment Variables

**Local Development (`.env`):**
```bash
ADMIN_KEY=YOUR_NEW_ADMIN_KEY_HERE
ADMIN_PASSWORD=YOUR_NEW_ADMIN_PASSWORD_HERE
VITE_ADMIN_KEY=  # Leave EMPTY or remove - client should NEVER have admin key!
```

**Cloud Run:**
```bash
gcloud run services update vstep-writing-studio \
  --set-env-vars ADMIN_KEY=YOUR_NEW_ADMIN_KEY_HERE,ADMIN_PASSWORD=YOUR_NEW_ADMIN_PASSWORD_HERE \
  --region asia-southeast1 \
  --project toeic-grammar-ace
```

### 3. Update Database

```sql
-- Hash the new password first using bcrypt
-- Then update:
UPDATE users 
SET password = '$2b$10$...' 
WHERE email = 'admin@gmail.com';
```

---

## 🛠️ CODE CHANGES

### File 1: `services/userService.ts`

```typescript
// Line 145 - getUsers()
export const getUsers = async (adminKey?: string): Promise<User[]> => {
    // ✅ FIXED: No hardcoded fallback
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    if (!adminKeyToUse) {
        throw new Error('Admin authentication required');
    }
    
    try {
        const { data: apiUsers, error } = await callAPI<User[]>('/api/users', {
            headers: {
                'X-Admin-Key': adminKeyToUse,
            },
        });
        if (!error && apiUsers && Array.isArray(apiUsers)) {
            // ❌ REMOVED: Don't cache in localStorage
            // saveData(LOCAL_STORAGE_KEYS.USERS, apiUsers);
            return apiUsers;
        }
    } catch (error) {
        console.error('Failed to fetch users from API:', error);
        throw new Error('Unable to fetch users - API connection required');
    }
    
    // ❌ REMOVED: No localStorage fallback
    throw new Error('User list only available via API');
};

// Line 483 - updateUserOnServer()
export const updateUserOnServer = async (userToUpdate: User, adminKey?: string): Promise<User> => {
    // ✅ FIXED: No hardcoded fallback
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    if (!adminKeyToUse) {
        throw new Error('Admin authentication required');
    }
    
    // ... rest of function
};

// Line 863 - deleteUser()
export const deleteUser = async (userId: string, adminKey?: string): Promise<boolean> => {
    // ✅ FIXED: No hardcoded fallback
    const adminKeyToUse = adminKey || import.meta.env.VITE_ADMIN_KEY;
    
    if (!adminKeyToUse) {
        throw new Error('Admin authentication required');
    }
    
    // ... rest of function
};
```

### File 2: `server.js`

```javascript
// At top of file - validate environment variables
const ADMIN_KEY = process.env.ADMIN_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_KEY) {
    console.error('❌ ADMIN_KEY environment variable is required');
    process.exit(1);
}

if (!ADMIN_PASSWORD) {
    console.error('❌ ADMIN_PASSWORD environment variable is required');
    process.exit(1);
}

// Line 461 - Remove hardcoded password
// ❌ OLD: const adminPassword = '01111110';
// ✅ NEW: Already loaded from env at top

// Line 513 - Use env variable
// ❌ OLD: if (adminKey && adminKey === (process.env.ADMIN_KEY || '01111110'))
// ✅ NEW:
if (adminKey && adminKey === ADMIN_KEY) {
    // Admin authenticated
}
```

---

## 📋 DEPLOYMENT CHECKLIST

### Phase 1: Immediate (Deploy NOW)
- [x] ✅ Updated `security-cleanup.js` to force logout admin users
- [x] ✅ Created this documentation
- [ ] Generate new admin key and password
- [ ] Set environment variables in Cloud Run
- [ ] Update database with new admin password (hashed!)
- [ ] Test admin login with new credentials

### Phase 2: Code Fix (Deploy within 1 hour)
- [ ] Update `services/userService.ts` - remove hardcoded key
- [ ] Update `server.js` - remove hardcoded password/key
- [ ] Remove `VITE_ADMIN_KEY` from `.env` (client shouldn't have it!)
- [ ] Add environment variable validation on server startup
- [ ] Test locally
- [ ] Deploy to production
- [ ] Verify admin panel still works

### Phase 3: Verification
- [ ] Check DevTools - no admin key in source
- [ ] Try old admin password - should FAIL
- [ ] Login with new admin password - should WORK
- [ ] Check admin panel functionality
- [ ] Verify user management works

---

## 🎯 SECURITY BEST PRACTICES

### ✅ DO:
- Store admin credentials in environment variables ONLY
- Use bcrypt to hash passwords in database
- Require admin key for ALL admin operations
- Validate environment variables on server startup
- Use different keys for development and production
- Rotate keys regularly (every 90 days)

### ❌ DON'T:
- NEVER hardcode admin keys in source code
- NEVER include admin keys in client-side code
- NEVER commit `.env` files to git
- NEVER use the same key for development and production
- NEVER store passwords in plain text
- NEVER include fallback admin keys "for convenience"

---

## 📊 IMPACT ASSESSMENT

### Current Risk:
- **CRITICAL** - Anyone can:
  - See admin key in client source code
  - Access admin API endpoints
  - Modify all users
  - Delete users
  - Adjust banana balances
  - Full admin access

### After Fix:
- ✅ Admin key only in server environment
- ✅ No hardcoded credentials
- ✅ Proper authentication required
- ✅ Old admin password invalidated
- ✅ Secure admin access

---

## 🚀 QUICK FIX COMMANDS

```bash
# 1. Generate new keys
NEW_ADMIN_KEY=$(node -e "console.log(require('crypto').randomBytes(24).toString('base64'))")
NEW_ADMIN_PASS=$(node -e "console.log(require('crypto').randomBytes(16).toString('base64'))")

echo "New Admin Key: $NEW_ADMIN_KEY"
echo "New Admin Password: $NEW_ADMIN_PASS"

# 2. Update Cloud Run
gcloud run services update vstep-writing-studio \
  --set-env-vars ADMIN_KEY=$NEW_ADMIN_KEY,ADMIN_PASSWORD=$NEW_ADMIN_PASS \
  --region asia-southeast1 \
  --project toeic-grammar-ace

# 3. Update local .env
echo "ADMIN_KEY=$NEW_ADMIN_KEY" >> .env
echo "ADMIN_PASSWORD=$NEW_ADMIN_PASS" >> .env

# 4. Connect to database and update admin password
# (Use bcrypt hash in production!)
```

---

**CRITICAL: Both user passwords AND admin credentials must be fixed IMMEDIATELY.**

**Priority:**
1. Deploy cleanup script (users) - ✅ DONE
2. Change admin credentials - ⚠️ TODO NOW
3. Remove hardcoded keys from code - ⚠️ TODO NOW
4. Deploy code fixes - ⚠️ TODO within 1 hour

