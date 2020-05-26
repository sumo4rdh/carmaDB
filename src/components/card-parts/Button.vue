<template>
  <span class="button">
    <router-link :to="alias">{{title}}</router-link>
  </span>
</template>

<script>
import Tags from './Tags';

export default {
  components: { Tags },
  props: {
    title: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    alias() {
      return `movie/${this.id}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  background-color: #90cea1;
  padding: 0.51rem 1rem 0.50rem;
  cursor: pointer;
  font-weight: 500;
  border: 1px solid #90cea1;
  transition: all 0.5s;
  display: inline-block;
}
.button:hover{
  background-color: transparent;
  border: 1px solid black;
}

</style>
