import pool from '@/app/db/pgSettings'

export async function getSuppliers() {
    const client = await pool.connect()
    try {
        const res = await client.query(`
        SELECT * FROM suppliers;
        `)

        console.log(res.rows)
        return res.rows;

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release()
        console.log('release')
    }
}
