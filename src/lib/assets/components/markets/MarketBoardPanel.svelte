<script lang="ts">
    import {mockListings} from '$lib/data/mockMarketData';

    const listings = mockListings;

    const lowestPrice = Math.min(...listings.map((item) => item.price));

    const totalQuality = listings.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const hqCount = listings.filter(
        (item) => item.quality === 'HQ' 
    ).length;
</script>

<main>

</main>