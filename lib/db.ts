import { Pool } from 'pg';

let pool: Pool | undefined;

if (!pool) {
	pool = new Pool({
		connectionString: process.env.NEON_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	});
}

export default pool;
