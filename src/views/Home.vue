<template>
  <div class="home-container">
    <SearchSection />
    <Carousel />
    <Activities />
  </div>
</template>

<script>
import SearchSection from '../components/SearchSection.vue';
import Carousel from '../components/Carousel.vue';
import Activities from '../components/Activities.vue';

export default {
  components: {
    SearchSection,
    Carousel,
    Activities
  }
}
</script>
