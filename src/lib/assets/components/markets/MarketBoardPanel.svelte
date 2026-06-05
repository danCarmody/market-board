<script lang="ts">
    import {onMount} from 'svelte';
    import {getMarketListings} from '$lib/api/universalis';

    type MarketListing = {
        quality: 'HQ' | 'NQ';
        price: number;
        quantity: number;
        total: number;
        updated: number;
    };

    let listings = $state<MarketListing[]>([]);
    let selectWorld = $state('Balmung');
    let itemID = $state('2');
    let loading = $state(true);
    let error = $state('');

    let lowestPrice = $derived(listings.length > 0 ? Math.min(...listings.map(item => item.price)): 0);
    let totalQuantity = $derived(listings.reduce((sum, item) => sum + item.quantity, 0));
    let hqCount = $derived(listings.filter(item => item.quality === 'HQ').length);

    async function loadMarketData() {
        loading = true;
        error = '';
        
        console.log('Fetching market data...');
        try {
            const data = await getMarketListings(selectWorld, Number(itemID));
            console.log('Universalis Data', data);

            listings = data.listings.map((listing: any): MarketListing => ({
                quality: listing.hq ? 'HQ' : 'NQ',
                price: listing.pricePerUnit,
                quantity: listing.quantity,
                total: listing.total,
                updated: listing.lastReviewTime 
            }));

            console.log('listings', listings);
        } catch(err){
            console.error(err);
            error = 'Could not load market data.';
        }
        finally {
            console.log('Done loading');
            loading = false;
        }
    }

    onMount(async () => {
        loadMarketData();
    });
</script>

<section class="max-w-4xl rounded-2xl border border-stone-200 bg-white shadow-sm">
    <header class="flex items-center justify-between border-b border-stone-200 p-5">
        <div>
            <p class="text-sm text-stone-500">Final Fantasy XIV</p>
            <h1 class="text-2xl font-bold text-stone-900">Market Board</h1>
        </div>

        <button class="rounded-lg border border-stone-300 px-3 py-2 text-sm">
            Refresh
        </button>
    </header>

    <div class="space-y-5 p-5">
        <div class="grid gap-3 md:grid-cols-3">
            <!--Replaced with api call, retireving dataceneters-->
            <select class="rounded-xl border border-stone-300 px-4 py-3">
                <option>Aether</option>
                <option>Crystal</option>
                <option>Primal</option>
            </select>

            <!--Replaced with api call, retireving that datacenters servers-->
            <select class="rounded-xl border border-stone-300 px-4 py-3">
                <option>Gilgamesh</option>
                <option>Cactuar</option>
                <option>Balmung</option>
            </select> 

            <input 
                class="rounded-xl border border-stone-300 px-4 py-3"
                placeholder="Search Item"
                bind:value={itemID}
            />
            <button class="rounded-lg border border-stone-300 px-3 py-2 text-sm" onclick={loadMarketData}> 
                Search
            </button>
        </div>
        

        <div class="grid gap-3 md:grid-cols-3">
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Lowest Price</p>
                <p class="text-2xl font-bold">{lowestPrice.toString()} gil</p>
            </div>
        
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Total Quantity</p>
                <p class="text-2xl font-bold">{totalQuantity.toString()}</p>
            </div>
            
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Total High Quality</p>
                <p class="text-2xl font-bold">{hqCount.toString()}</p>
            </div>
        </div>

        
        <p>Debug loading: {loading ? 'true' : 'false'}</p>
        {#if loading}
            <p>loading market data</p>
        {:else if error}
            <p class="text-red-500">{error}</p>
        {:else}
            <div>
                <h2 class="mb-3 font-bold text-stone-800">Price Listings</h2>

                <div class="divide-y divide-stone-200">
                    {#each listings as listing}
                    <div class="grid grid-cols-4 gap-3 py-3">
                        <p>{listing.quality}</p>
                        <p>{listing.price.toLocaleString()} gil</p>
                        <p>{listing.quantity}</p>
                        <p>{listing.total.toLocaleString()} gil</p>
                    </div>
                    {/each}
                </div>
            </div>
        {/if}

    </div>
</section>