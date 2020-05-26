<template>
  <div class="card-container"
       :class="{ 'flip': isFlip}">
    <div class="card-inner">
      <router-link :to="'/movie/' + mv_id" v-if="direct"
           class="card-front">
        <img :src="'https://image.tmdb.org/t/p/w500' + poster">
        <Tags :value="vote_average"
              :tagName="'Score'"/>
      </router-link>
      <div v-else
           @click="flip" class="card-front">
        <img :src="'https://image.tmdb.org/t/p/w500' + poster">
        <Tags :value="vote_average"
              :tagName="'Score'"/>
      </div>
      <!-- <CardBack
        :backdrop_path="backdrop_path"
        :title="title"
        :id="mv_id"
        :overview="overview"
        :popularity="popularity"
        :vote_average="vote_average"
        :vote_count="vote_count"/> -->
    </div>
  </div>
</template>

<script>
import CardBack from './card-parts/CardBack';
import Tags from './card-parts/Tags';

export default {
  components: { CardBack, Tags },
  name: 'MovieCard',
  props: {
    direct: {
      type: Boolean,
      default: false,
    },
    poster: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    overview: {
      type: String,
      default: '',
    },
    popularity: {
      type: Number,
      default: 0,
    },
    mv_id: {
      type: Number,
      default: 0,
    },
    vote_average: {
      type: Number,
      default: 0,
    },
    vote_count: {
      type: Number,
      default: 0,
    },
    backdrop_path: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isFlip: false,
    };
  },
  methods: {
    flip() {
      this.isFlip = !this.isFlip;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

.card-inner
  position: relative
  padding-top: 150%
  text-align: center
  transition: all 0.6s
  transform-style: preserve-3d
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)

.card-container.flip .card-inner
  transform: rotateY(180deg)
.card-tag
  position: absolute
  bottom: 1rem
  padding: 0 0.5rem 0.5rem
  border-radius: 5px
  left: 0
  transition: all 0.5s
  background: rgba(255, 255, 255, 0.5)
.card-front, .card-back
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  -webkit-backface-visibility: hidden
  backface-visibility: hidden
.card-front
  filter: grayscale(60%)
  background-color: #bbb
  color: black
  transition: all 0.5s
  overlay: hidden
  text-align: center
.card-container
  background: transparent
  position: relative
  perspective: 1000px
  overflow: hidden
  .card-front img
    height: 100%
    min-width: 100%
  &:hover .card-front
    filter: grayscale(0%)

</style>
