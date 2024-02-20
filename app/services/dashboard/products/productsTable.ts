import pool from '@/app/db/pgSettings'

export async function getTable
    (
        arrColumns: string[],
        orderBy: string = 'art',
        sortOrder: string = 'ASC',
        query: string | undefined = ''
    ) {
    const client = await pool.connect();

    try {
        console.log('connected to database')
        const result = await client.query(
            `SELECT ${arrColumns.join(', ')} FROM products
            JOIN categories ON products.category_id = categories.id
            ${ query &&
            ` WHERE
            art::varchar ILIKE '${query}'::varchar OR
            title::varchar ILIKE '%${query}%'::varchar OR
            amount::varchar ILIKE '${query}'::varchar`
            }
            ${orderBy !== '' ? `ORDER BY ${orderBy} ${sortOrder}` : ""}`
        )
        const data = result.rows;

        return data;
    } catch (err) {
        console.error('error fetching products:', err);
        return err;

    } finally {
        client.release();
        console.log('release database')
    }
}
