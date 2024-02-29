'use server'
import pool from '@/app/db/pgSettings'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';


export async function getProduct(productId: string) {

    const client = await pool.connect();

    try {

        const result = await client.query(
            `SELECT * FROM products
            JOIN categories ON products.category_id = categories.id
            JOIN descriptions ON products.description_id = descriptions.id
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
    const { title, category, izm, price, price_2, price_3, bonuses, vitrine } = newData;
    const client = await pool.connect();
    console.log(vitrine)

    try {
        const result = await client.query(
            `UPDATE products
            SET title = '${title}', 
            category_id = (SELECT id FROM categories WHERE category = '${category}'),
            price = ${price},
            price_2 = ${price_2},
            price_3 = ${price_3},
            bonuses = ${bonuses},
            vitrine = ${vitrine}
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

export async function imgName(productId: string) {

    const client = await pool.connect();

    try {
        const result = await client.query(
            `UPDATE products
            SET img_link = '${productId}'
            WHERE art = ${productId}
            `
        )

        const data = result.rows[0]
        console.log('query return', data)
        return data;

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}


export async function changeDescription(productId: string, value: string) {

    const client = await pool.connect();

    try {
        const result = await client.query(
            ` 
            BEGIN;
            INSERT INTO descriptions (id, content)
            VALUES (${productId}-${1000}, '${value}')
            ON CONFLICT (id) DO UPDATE
            SET content = EXCLUDED.content;

            UPDATE products
            SET description_id =  (SELECT id FROM descriptions WHERE id = ${productId}-${1000})
            WHERE art = ${productId};    
            COMMIT;
            `
        )

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export async function deleteProduct(art: string) {
    const pArt = Number(art);
    console.log(art, pArt)


    const client = await pool.connect();

    try {
        const result = await client.query(
            `
            DELETE FROM products
            WHERE art = ${pArt};
            `
        )
        revalidatePath('/dashboard/products/')
        return result.command;

    } catch (err) {
        console.log(err);
        return 'err';
    } finally {
        client.release();
    }
}
