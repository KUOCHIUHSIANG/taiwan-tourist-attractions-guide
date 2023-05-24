<template>
  <div class="home-container">
    <SearchSection />
    <Carousel />
  </div>
</template>

<script>
import SearchSection from '../components/SearchSection.vue';
import Carousel from '../components/Carousel.vue';

export default {
  components: {
    SearchSection,
    Carousel
  }
}
</script>
