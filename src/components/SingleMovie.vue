<template>
<div class="single-movie">
  <div class="single-movie-left">
    <div class="heading-container"
         :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
      <div class="heading-color-overlay">
        <div class="single-movie-info">
          <img :src="posterImage">
          <div class="single-movie-heading">
            <div class="single-movie-title">
              <h1>{{movie.title}}</h1>
              <div class="sub-info">
                <span>Time {{ movie.runtime }}min.</span>
                <span><i v-for="genre in movie.genres"> {{ genre.name }}</i></span>
                <span>{{ movie.release_date }}</span>
              </div>
            </div>
            <div class="single-movie-rating">
              <div class="single-movie-description">
                <h3>Overview</h3>
                <p>{{ movie.overview }}</p>
              </div>
              <ol class="single-movie-people">
                <li class="profile">
                  <p><a href="/person/55075-jeff-wadlow?language=pl">Jeff Wadlow</a></p>
                  <p class="character">Screenplay, Story</p>
                </li>

                <li class="profile">
                  <p><a href="/person/1773871-dave-wilson?language=pl">Dave Wilson</a></p>
                  <p class="character">Director</p>
                </li>

                <li class="profile">
                  <p><a href="/person/115033-eric-heisserer?language=pl">Eric Heisserer</a></p>
                  <p class="character">Screenplay</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="single-movie-content">
    <h3>Cast:</h3>
    <div class="single-movie-cast">
      <div class="single-movie-cast--person"
          v-for="person in credits.cast">
        <img v-if="person.profile_path !== null || person.profile_path !== undefined" :src="'https://image.tmdb.org/t/p/w138_and_h175_face' + person.profile_path" alt="">
        <div v-else class="no-image" >
          <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" alt="">
        </div>

        <div class="">
          <div class="">
            <b>{{ person.name }} </b>
            <br>as<br>
            {{ person.character }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="recommendations.length > 0"
         class="single-movie-recomendation-container">
      <h3>RECOMENDATIONS:</h3>
      <div class="single-movie-recomendation">
          <MovieCard v-for="recomendation in recommendations"
                     v-if="recomendation.poster_path !== undefined"
                     :direct="true"
                     :key="recomendation.id"
                     :mv_id="recomendation.id"
                     :poster="recomendation.poster_path"
                     :title="recomendation.title"
                     :popularity="recomendation.popularity"
                     :vote_average="recomendation.vote_average"
                     :backdrop_path="recomendation.backdrop_path"
                     :vote_count="recomendation.vote_count"/>
      </div>
    </div>
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
  props: {
    id: {
      type: String,
      default: 0,
    },
  },
  data() {
    return {
      apiKey: 'cce2b9cf62a56d484f46d0f7b50ec168',
      movie: {},
      credits: {},
      recommendations: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    backgroundImage() {
      return this.movie.backdrop_path !== undefined ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${this.movie.backdrop_path}` : '';
    },
    posterImage() {
      return this.movie.poster_path !== undefined ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}` : '';
    },
  },
  watch: {
    id() {
      this.fetchData(this.id);
    },
  },
  methods: {
    fetchData() {
      const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.apiKey}&language=en-US`;
      const credits = `https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${this.apiKey}&language=en-US`;
      const recommendations = `https://api.themoviedb.org/3/movie/${this.id}/similar?api_key=${this.apiKey}&language=en-US`;
      axios.get(url)
        .then((response) => {
          this.movie = response.data;
        });
      axios.get(credits)
        .then((response) => {
          this.credits = response.data;
        });
      axios.get(recommendations)
        .then((response) => {
          this.recommendations = response.data.results.slice(-6);
        });
    },
  },
};
</script>

<style lang="sass">
.heading
  &-color-overlay
    background-image: linear-gradient(to right, rgba(20.78%, 24.31%, 30.98%, 1.00) 150px, rgba(29.80%, 31.76%, 36.08%, 0.84) 100%)
    padding: 2rem
.single-movie
  background: #f8f9fa
  display: grid
  grid-template-columns: 4fr
  text-align: left
  padding-bottom: 100px
  h1,h2,h3,h4,h5
    margin-bottom: 5px
  img
    max-width: 100%
  &-heading
    margin-left: 2rem
  &-info, &-content
    max-width: 1300px
    width: 100%
    margin: 0 auto
    padding: 0 2rem
  &-info
    display: grid
    grid-template-columns: 5fr 18fr
    color: white
    text-align: left
  &-right
    padding-left: 1rem
  &-recomendation
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-gap: 2rem
    &-container
      max-width: 1300px
      width: 100%
      margin: 0 auto
  &-people
    margin-top: 20px
    justify-content: flex-start
    flex-wrap: wrap
    list-style-type: none
    list-style-position: inside
    margin: 0
    padding: 0
    display: flex
    position: relative
    top: 0
    left: 0
    .profile
      width: 33%
      flex-basis: 33%
      text-align: left
      margin-bottom: 14px
      margin-right: 0
      box-sizing: border-box
      padding-right: 20px
      a
        font-weight: bold
        color: white
        text-decoration: none
      p
        margin: 0
        font-size: 1em
  &-cast
    display: flex
    flex-direction: row
    justify-content: flex-start
    overflow-x: scroll
    &--person
      min-width: 140px
      margin-right: 1rem

  .sub-info span
    padding-left: 20px
    position: relative
    top: 0
    left: 0
    &::before
      font-size: 1.1em
      line-height: 1
      content: '\2022'
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 7px
      display: inline-flex
      align-content: center
      align-items: center
.no-image
  width: 138px
  height: 175px
  display: flex
  justify-content: center
  align-items: center
  background: grey
.card-container
  margin-bottom: 1rem

</style>
