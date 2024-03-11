'use server'
import pool from '@/app/db/pgSettings'

export async function getCategories() {
    const client = await pool.connect();

    try {

        const result = await client.query(
            `SELECT * FROM categories`
        )
        return result.rows;

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}

export async function addCategory(value: any) {
    const client = await pool.connect();

    try {
        await client.query(
            `INSERT INTO categories(category) VALUES ('${value}');`,
        )
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}
