'use server'
import pool from '@/app/db/pgSettings'

export async function getProduct(productId: string) {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT * FROM products
            JOIN categories ON products.category_id = categories.id
            WHERE art = ${productId}
            `
        )

        const data = result.rows[0]
        return data;

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}


export async function changeProduct(productId: string, newData: any) {
    const { title, category, izm, price, price_2, price_3, bonuses } = newData;
    const client = await pool.connect();

    //console.log(art)
    /* const test =
        `UPDATE products
            SET title = '${title}', 
            category_id = (SELECT id FROM categories WHERE category = '${category}'), 
            price = ${price},
            price_2 = ${price_2},
            price_3 = ${price_3},
            bonuses = ${bonuses}
            WHERE art = ${productId}
    `
    console.log(test) */

    try {
        const result = await client.query(
            `UPDATE products
            SET title = '${title}', 
            category_id = (SELECT id FROM categories WHERE category = '${category}'),
            price = ${price},
            price_2 = ${price_2},
            price_3 = ${price_3},
            bonuses = ${bonuses}
            WHERE art = ${productId}
            `
        )

        const data = result.rows[0]
        return data;

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}


