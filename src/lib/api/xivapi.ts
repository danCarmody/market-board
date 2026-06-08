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
    
    return null;   
}