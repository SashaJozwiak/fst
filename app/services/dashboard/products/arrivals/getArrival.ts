'use server'
import pool from '@/app/db/pgSettings'
import { revalidatePath } from 'next/cache';


export async function saveData(art_arrival: string, data: any[], sum: any, opl: number, status: string) {
    const client = await pool.connect();

    console.log(art_arrival, data)
    console.log(sum)

    try {
        data.forEach(async element => {
            await client.query(`
                BEGIN;
                UPDATE arrivals_products
                SET amount = ${element.amount}, cost_price= ${element.cost_price},
                cost_price_sum= ${element.cost_price_sum}
                WHERE arrivals_art = ${element.arrivals_art} AND product_art = ${element.product_art};
                
                UPDATE products
                SET price = ${element.price}, price_2 = ${element.price_2}, price_3 = ${element.price_3},
                bonuses = ${element.bonuses}, cost_price= ${element.cost_price}
                WHERE art = ${element.product_art};

                UPDATE arrivals
                SET paid = ${opl}
                WHERE art = ${element.arrivals_art};

                UPDATE arrivals 
                SET status = '${status}' 
                WHERE art = ${art_arrival};
                COMMIT;
           `)
        });
        revalidatePath('dashboard/products/arrivals')

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}

export async function getPaid(art: any) {
    'use server'
    const client = await pool.connect();

    try {
        const res = await client.query(`
            SELECT paid FROM arrivals
            WHERE art = ${art}
        `)
        const result = res.rows[0].paid
        return result;

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}


export async function saveStatus(status: string, art: any) {
    const client = await pool.connect();
    console.log(art)
    try {
        await client.query(
            `
        UPDATE arrivals 
        SET status = '${status}' 
        WHERE art = ${art};
        `)
        revalidatePath('dashboard/products/arrivals')

    } catch (err) {
        console.log(err);
        return err;

    } finally {
        client.release();
    }
}

