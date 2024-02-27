'use server'
import pool from '@/app/db/pgSettings'

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
        product_art, arrivals_art, arrivals_products.cost_price, cost_price_sum, arrivals_products.amount, title 
        FROM arrivals_products
        JOIN products ON arrivals_products.product_art = products.art
        WHERE arrivals_art = ${id}
        
        `
        )
        const data = result.rows;
        //console.log(result.rows);

        return data;

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    }
}
