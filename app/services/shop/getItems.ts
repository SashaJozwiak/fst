export async function getAllItems() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://fakestoreapi.com/products?limit=20')
    const data = await res.json()

    return data;
}
