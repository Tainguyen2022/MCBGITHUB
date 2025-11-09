/**
 * Script to update admin password in database
 * Run this AFTER setting ADMIN_PASSWORD environment variable
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_EMAIL = 'admin@gmail.com';

if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required');
    process.exit(1);
}

if (!ADMIN_PASSWORD) {
    console.error('❌ ADMIN_PASSWORD environment variable is required');
    process.exit(1);
}

async function updateAdminPassword() {
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: DATABASE_URL.includes('cloudsql') ? {
            rejectUnauthorized: false
        } : false
    });

    try {
        console.log('🔒 Hashing new admin password...');
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);
        
        console.log('📝 Updating admin password in database...');
        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE email = $2',
            [hashedPassword, ADMIN_EMAIL]
        );
        
        if (result.rowCount === 0) {
            console.error('❌ Admin user not found in database');
            process.exit(1);
        }
        
        console.log('✅ Admin password updated successfully!');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Password: [HASHED]`);
        console.log(`   Hash: ${hashedPassword.substring(0, 20)}...`);
        
    } catch (error) {
        console.error('❌ Error updating admin password:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

updateAdminPassword();
