<!-- <template>
  <div class="card-back">
    <img :src="'https://image.tmdb.org/t/p/w500' + backdrop_path">
    <div class="card-data">
      <h3>{{title}}</h3>
      <p>{{overview}}</p>
      <Button :title="'MORE'"
              :id="id"/>
      <div class="card-tags">
        <Tags :value="popularity"
              :tagName="'Popularity'"/>
        <Tags :value="vote_average"
              :tagName="'Vote Average'"/>
        <Tags :value="vote_count"
              :tagName="'Vote Count'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from './Tags';
import Button from './Button';

export default {
  components: { Tags, Button },
  props: {
    backdrop_path: {
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
    id: {
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
  },
  created() {
  },
  mounted() {
  },
  methods: {
    more(id) {
      router.push({ name: 'movie', params: { id } });
    },
  },
  computed: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-back {
  background-color: white;
  color: black;
  transform: rotateY(180deg);
}
.card-data{
  padding: 0 1rem
}
.card-tags{
  position: absolute;
  bottom: 1rem;
  left: 0;
  display: flex;
}
img{
  width: 100%;
}
</style> -->
