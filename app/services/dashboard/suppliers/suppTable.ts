'use server'
import pool from '@/app/db/pgSettings'
import { revalidatePath } from 'next/cache'
import { unstable_noStore as noStore } from 'next/cache';

export async function getSuppliers() {


    const client = await pool.connect()
    noStore();
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

export async function addSupplier(data: any) {
    const client = await pool.connect();
    const { name, tel, email, comment } = data;

    console.log(data)

    try {
        await client.query(`INSERT INTO suppliers (name, phone_number, email, comment) 
        VALUES ($1, $2, $3, $4)`, [name, tel, email, comment]);
        revalidatePath(`http://localhost:3001/dashboard/products/arrivals/suppliers`);
    } catch (err) {
        console.log(err)
        return err;

    } finally {
        client.release()
    }
}

export async function deleteSupplier(art: number) {
    const client = await pool.connect();
    noStore();
    try {
        console.log('database connection')
        await client.query(
            `
            DELETE FROM suppliers WHERE id = ${art};
            `
        )

        revalidatePath(`http://localhost:3001/dashboard/products/arrivals/suppliers`)

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
    }
};
