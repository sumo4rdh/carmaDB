<template>
  <nav class="navigation">
    <div class="navigation-container">
      <router-link to="/">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="The Movie Database (TMDb)" width="154" height="20">
      </router-link>
      <router-link to="/dashboard">
        Dashboard
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style lang="sass">

.navigation
  position: fixed
  z-index: 1
  top: 0
  left: 0
  right: 0
  background: rgb(28, 28, 28)
  height: 64px

.navigation-container
  max-width: calc(2000px - 4rem)
  margin: 0 auto
  padding: 0 2rem
  display: flex
  flex-direction: row
  align-items: center
  height: 64px

.navigation-container a
  text-decoration: none
  display: block
  color: white
  height: 20px
  font-weight: bold
  margin-right: 2rem
  text-transform: uppercase


</style>
