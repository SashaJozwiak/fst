'use server'
import pool from '@/app/db/pgSettings'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getArrivals(columns: string[]) {

    const client = await pool.connect();

    try {
        console.log('connected to database')
        const result = await client.query(
            ` SELECT status, art, date, name as supplie, paid,
            (SELECT SUM(cost_price_sum)
            FROM arrivals_products
            WHERE arrivals_art = arrivals.art) as sum FROM arrivals
            JOIN suppliers ON arrivals.supplier_id = suppliers.id
            ;
        `
        );
        const data = result.rows;

        return data;

    } catch (err) {
        console.log('ошибка: ', err);
        return err;
    } finally {
        client.release();
        console.log('release database')
    }

}


export async function getArrival(id: string) {
    const client = await pool.connect();

    try {
        console.log('connected to database')
        const result = await client.query(
            `
        SELECT 
        product_art,
        arrivals_art,
        arrivals_products.cost_price,
        cost_price_sum,
        arrivals_products.amount,
        products.amount as curr_amount,
        title, price, price_2, price_3, bonuses
        FROM arrivals_products
        JOIN products ON arrivals_products.product_art = products.art
        WHERE arrivals_art = ${id}
        
        `
        )
        const data = result.rows;

        return data;

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}


export async function getSearchList(query: string | undefined) {
    const client = await pool.connect();

    try {
        console.log('database connection')
        const result = await client.query(
            `
            SELECT * FROM products
            WHERE 
            title::varchar ILIKE '%${query}%'::varchar
            `
        )
        return result.rows

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
    }
}


export async function addProductToArrival(pArt: string, aArt: string) {

    const product_art = Number(pArt);
    const arrivals_art = Number(aArt);

    const client = await pool.connect();
    try {
        console.log('database connection for addProductToArrival')
        await client.query(
            `
            INSERT INTO arrivals_products (product_art, arrivals_art)
            VALUES (${product_art}, ${arrivals_art});
            `
        )

        revalidatePath(`/dashboard/products/arrivals/${aArt}`)


    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
        //revalidatePath(`/dashboard/products/arrivals/${aArt}`)

    }
};


export async function deleteProductFromList(pArt: string, aArt: string) {

    const product_art = Number(pArt);
    const arrivals_art = Number(aArt);

    const client = await pool.connect();
    try {
        console.log('database connection for deleteProductFromList')
        await client.query(
            `
            DELETE FROM arrivals_products
            WHERE product_art = ${product_art} AND 
            arrivals_art = ${arrivals_art};
            `
        )

        revalidatePath(`/dashboard/products/arrivals/${aArt}`)

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
    }
}

export async function addNewProduct(newProduct: string, aArt: string) {
    const arrivals_art = Number(aArt);
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const insertProductQuery = {
            text: 'INSERT INTO products (title, amount, price, price_2, price_3, category_id, img_link, discount, bonuses, cost_price, description_id, vitrine) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [newProduct, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, false]
        };

        await client.query(insertProductQuery);

        const getProductArtQuery = {
            text: 'SELECT art FROM products WHERE title = $1',
            values: [newProduct]
        };

        const result = await client.query(getProductArtQuery);
        const productArt = result.rows[0].art;

        const insertArrivalsQuery = {
            text: 'INSERT INTO arrivals_products (product_art, arrivals_art) VALUES ($1, $2)',
            values: [productArt, arrivals_art]
        };

        await client.query(insertArrivalsQuery);

        await client.query('COMMIT');

        revalidatePath(`/dashboard/products/arrivals/${aArt}`);
        //redirect(`/dashboard/products/arrivals/${aArt}`);

    } catch (err) {
        console.log(err);
        await client.query('ROLLBACK');
        return err;
    } finally {
        client.release();
    }
}

export async function addArrival() {
    'use server'

    const client = await pool.connect();
    try {
        console.log('database connection for addProductToArrival')
        await client.query(
            `
            INSERT INTO arrivals (date, supplier_id, status)
            VALUES (NOW(), 1, 'Черновик');
            `
        )

        revalidatePath(`/dashboard/products/arrivals`)

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
    }
};

export async function deleteArrival(art: number) {
    /*     'use server' */

    const client = await pool.connect();
    try {
        console.log('database connection for addProductToArrival')
        await client.query(
            `
            BEGIN;
            DELETE FROM arrivals_products WHERE arrivals_art = ${art};
            DELETE FROM arrivals WHERE art = ${art};
            COMMIT;
            `
        )

        revalidatePath(`/dashboard/products/arrivals`)

    } catch (err) {
        console.log(err)
        return err;
    } finally {
        client.release();
    }
};
