<template>
  <div class="card-tag">
    <span>{{tagName}}</span>
    <div class="value">
      {{value}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagName: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-tag{
  margin-left: 1rem;
  display: inline-block;
  text-align: left;
}
span {
  font-size: 70%
}
.value {
  text-align: center;
  border: 1px solid gray;
  padding: 0.5rem
}
</style>
