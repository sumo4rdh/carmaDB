<template>
<div class="">
  <div>sort
    <v-select placeholder="Choose a sort type"
              @input="movieSort(sortType)"
              v-model="sortType"
              :options="options">
    </v-select>
  </div>
  <div class="list-container">
    <MovieCard v-for="movie in movies"
               :direct="true" :key="movie.id"
               :mv_id="movie.id"
               :poster="movie.poster_path"
               :title="movie.title"
               :popularity="movie.popularity"
               :vote_average="movie.vote_average"
               :backdrop_path="movie.backdrop_path"
      :vote_count="movie.vote_count" />
  </div>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
  </div>
</div>
</template>

<script>
import axios from 'axios';
import MovieCard from '@/components/MovieCard';

export default {
  components: {
    MovieCard,
  },
  name: 'MovieList',
  data() {
    return {
      apiUrl: 'https://api.themoviedb.org/3/movie/now_playing?api_key=cce2b9cf62a56d484f46d0f7b50ec168&page=',
      movies: [],
      options: [{
        prop: 'popularity',
        order: 0,
        label: 'Popularity Descending',
      },
      {
        prop: 'popularity',
        order: 1,
        label: 'Popularity Ascending',
      },
      {
        prop: 'vote_average',
        order: 0,
        label: 'Rating Descending',
      },
      {
        prop: 'vote_average',
        order: 1,
        label: 'Rating Ascending',
      },
      {
        prop: 'title',
        order: 0,
        label: 'Title (A-Z)',
      },
      {
        prop: 'title',
        order: 1,
        label: 'Title (Z-A)',
      },
      ],
      sortType: '',
      data: [],
      busy: false,
      page: 1,
    };
  },
  created() {
    this.fetchData(this.page);
  },
  mounted() {},
  methods: {
    movieSort(opt) {
      if (opt != null) {
        this.movies.sort((a, b) => {
          return ((a[opt.prop] > b[opt.prop]) ? 1 : ((b[opt.prop] > a[opt.prop]) ? -1 : 0));
        })
        if (opt.order) this.movies.reverse();
      }
    },
    fetchData(page) {
      const url = this.apiUrl + page;
      return axios.get(url)
        .then((response) => {
          this.movies.push(...response.data.results);
        });
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.page += 1;
        this.fetchData(this.page);
        this.busy = false;
      }, 1000);
    },
  },
};
</script>

<style lang="sass">
.list-container
  padding: 40px
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-auto-rows: auto
  grid-gap: 2rem
  @media screen and (max-width: 740px)
    grid-template-columns: repeat(2, 1fr)
.v-select
  background: white
  margin: 0 2rem
</style>
