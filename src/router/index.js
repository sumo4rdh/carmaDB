import Vue from 'vue';
import Router from 'vue-router';
import MovieList from '@/components/MovieList';
import SingleMovie from '@/components/SingleMovie';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList,
    },
    {
      path: '/movie/:id',
      name: 'SingleMovie',
      component: SingleMovie,
      props: true,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
