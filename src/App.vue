<template>
  <div id="app">
    <Nav/>
    <transition :name="transitionName"
                :duration="2000">
        <router-view :key="$route.params.id" class="child-view"/>
    </transition>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  name: 'App',
  components: { Nav },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      const side = 'slide-left';
      this.slideSide(side);
    },
  },
  methods: {
    slideSide(side) {
      this.transitionName = side;
    },
  },
};
</script>

<style>
.child-view {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  right: 0;
  left: 0;
  max-width: 2000px;
  transition: all 1s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  max-width: 2000px;
  margin: 0 auto;
}
body{
  background: black;
  padding: 64px 0 120px;
  margin: 0;
}
</style>
