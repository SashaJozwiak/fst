import React from 'react'

export default async function page({ params }: { params: { id: string } }) {
    const art = params.id;
    console.log(art)
    return (
        <div>Product {art}</div>
    )
}
