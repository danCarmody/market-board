export type ItemSearchResult = {
    row_id: number;
    fields: {
        Name: string;
    };
};

export async function searchItems(query: string):Promise<ItemSearchResult[]> {
    const response = await fetch(
        `https://v2.xivapi.com/api/search?sheets=Item&query=Name~"${encodeURIComponent(query)}"&fields=Name`
    );

    if(!response.ok) {
        throw new Error('Failed to find item');
    }

    const data = await response.json();

    
    return data.results ?? [];   
}