import db from './db.js';

const createUser = async (name, email, passwordHash) => {
    const defaultRole = 'user';

    const query = `
        INSERT INTO users (name, email, password_hash, role_id)
        VALUES (
            $1,
            $2,
            $3,
            (SELECT role_id FROM roles WHERE role_name = $4)
        )
        RETURNING user_id;
    `;

    const result = await db.query(
        query,
        [name, email, passwordHash, defaultRole]
    );

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    return result.rows[0].user_id;
};

export { createUser };