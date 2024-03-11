'use server'
import pool from '@/app/db/pgSettings'

export async function getTable
    (
        arrColumns: string[],
        orderBy: string = 'art',
        sortOrder: string = 'ASC',
        query: string | undefined = '',
        page: number = 1,
    ) {
    console.log(page)

    const ITEMS_PER_PAGE = 10;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const client = await pool.connect();

    try {
        console.log('connected to database')

        const { rowCount } = await client.query(`
        SELECT ${arrColumns.join(', ')} FROM products
            JOIN categories ON products.category_id = categories.id
            ${query &&
            ` WHERE
            art::varchar ILIKE '${query}'::varchar OR
            title::varchar ILIKE '%${query}%'::varchar OR
            amount::varchar ILIKE '${query}'::varchar`
            }
            ${orderBy !== '' ? `ORDER BY ${orderBy} ${sortOrder}` : ""}
            `)


        const result = await client.query(
            `SELECT ${arrColumns.join(', ')} FROM products
            JOIN categories ON products.category_id = categories.id
            ${ query &&
            ` WHERE
            art::varchar ILIKE '${query}'::varchar OR
            title::varchar ILIKE '%${query}%'::varchar OR
            amount::varchar ILIKE '${query}'::varchar`
            }
            ${orderBy !== '' ? `ORDER BY ${orderBy} ${sortOrder}` : ""}
            LIMIT ${ITEMS_PER_PAGE} 
            OFFSET ${offset};
            `
        )

        console.log(rowCount);


        return { 'data': result.rows, 'totalItems': rowCount };

    } catch (err) {
        console.error('error fetching products:', err);
        return err;

    } finally {
        client.release();
        console.log('release database')
    }
}
