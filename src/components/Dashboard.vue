<template>
<div
     class="dashboard">
  <h1>Dashboard</h1>
  <Chart v-if="loaded"
         :title="'10 Top Rated Movie'"
         :data="topMovies"
         :yAxis="'Movie Vote Rate'"/>
  <hr>
  <Chart v-if="loaded"
        :title="'10 Top Rated Movie Vote Count'"
        :yAxis="'Movie Vote Count'"
        :data="topMoviesCount"/>
</div>
</template>

<script>
import axios from 'axios';
import Chart from './Chart';

export default {
  name: 'Dashboard',
  components: { Chart },
  data() {
    return {
      apiKey: 'cce2b9cf62a56d484f46d0f7b50ec168',
      loaded: false,
      topMovies: [],
      topMoviesCount: [],
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
  },
  methods: {
    fetchData() {
      const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=cce2b9cf62a56d484f46d0f7b50ec168&language=en-US&page=1';
      axios.get(url)
        .then((response) => {
          const resp = response.data.results.slice(-10);
          this.topMovies = resp.map(o => ({ title: o.title, rate: o.vote_average }));
          this.topMoviesCount = resp.map(o => ({ title: o.title, rate: o.vote_count }));
          this.loaded = true;
        });
    },
  },
};
</script>

<style lang="sass">
.dashboard
  color: black
  background: #f8f9fa
  padding-top: 2rem
</style>
