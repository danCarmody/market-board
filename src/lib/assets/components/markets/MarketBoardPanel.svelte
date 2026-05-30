<script lang="ts">
    import {mockListings} from '$lib/data/mockMarketData';

    const listings = mockListings;

    const lowestPrice = Math.min(...listings.map((item) => item.price));

    const totalQuantity = listings.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const hqCount = listings.filter(
        (item) => item.quality === 'HQ' 
    ).length;
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
            />
        </div>

        <div class="grid gap-3 md:grid-cols-3">
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Lowest Price</p>
                <p class="text-2xl font-bold">{lowestPrice.toString()} gil</p>
            </div>
        </div>

        <div class="grid gap-3 md:grid-cols-3">
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Total Quantity</p>
                <p class="text-2xl font-bold">{totalQuantity.toString()}</p>
            </div>
        </div>

        <div class="grid gap-3 md:grid-cols-3">
            <div class="rounded-xl bg-stone-100 p-4">
                <p class="text-sm text-stone-600">Total High Quality</p>
                <p class="text-2xl font-bold">{hqCount.toString()}</p>
            </div>
        </div>
    </div>
</section>