export async function getMarketListings(world: string, itemID: number) {
    const response = await fetch(
        `https://universalis.app/api/v2/${world}/${itemID}`
    );

    if(!response.ok){
        throw new Error('Failed to fetch data');
    }

    return response.json();
}