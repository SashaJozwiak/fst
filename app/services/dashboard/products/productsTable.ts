import pool from '@/app/db/pgSettings'

export async function getTable(arrColumns: string[], orderBy: string = '', sortOrder: string = '') {
    const client = await pool.connect();

    try {
        console.log('connected to database')
        const result = await client.query(
            `SELECT ${arrColumns.join(', ')} FROM products
            ${orderBy !== '' ? `ORDER BY ${orderBy} ${sortOrder}` : ""}`
        )
        const data = result.rows;
        console.log(data)
        return data;
    } catch (err) {
        console.error('error fetching products:', err);
        return err;
    } finally {
        client.release();
        console.log('release database')
    }

}
