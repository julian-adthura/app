<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import ParseUtility from "../utilities/parse";
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      test: "Test",
      listings: []
    }
  },
  async mounted() {
    const _listings = []
    const listingObject = new Parse.Object('Listing');
    const query = new Parse.Query(listingObject);
    const listings = await ParseUtility.getListings();
    listings.forEach(listing => {
      query.get(listing.id).then((result) => {
        _listings.push(result.toJSON())
      }).catch((error) => {
        console.error('Error fetching listings:', error);
      });
    });
    this.$data.listings = _listings
  },
  components: {
    HelloWorld
  }
}
</script>
