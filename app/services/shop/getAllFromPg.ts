import pool from '../../db/pgSettings'

export async function getAllPg() {
    const client = await pool.connect();
    try {
        console.log('connected to database')
        const result = await client.query('SELECT * FROM products')
        const data = result.rows;
        return data;
    } catch (err) {
        console.error('error fetching products:', err);
        return err;
    } finally {
        client.release();
        console.log('release database')
    }
}
