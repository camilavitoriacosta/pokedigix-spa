import { createRouter, createWebHistory } from 'vue-router'
import PokemonListaView from '../views/PokemonListaView.vue'
import TipoNovoView from '../views/TipoNovoView.vue'
import TipoEditarView from '../views/TipoEditarView.vue'
import TipoListaView from '../views/TipoListaView.vue'
import AtaqueNovoView from '../views/AtaqueNovoView.vue'
import AtaqueEditView from '../views/AtaqueEditView.vue'
import AtaqueListaView from '../views/AtaqueListaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListaView
    },
    {
      path: '/pokemons/lista',
      name: 'pokemons-lista',
      component: PokemonListaView
    },
    {
      path: '/tipos/novo',
      name: 'tipos-novo',
      component: TipoNovoView
    },
    {
      path: '/tipos/editar/:id',
      name: 'tipos-editar',
      component: TipoEditarView
    },
    {
      path: '/tipos/lista',
      name: 'tipos-lista',
      component: TipoListaView
    },
    {
      path: '/ataques/novo',
      name: 'ataques-novo',
      component: AtaqueNovoView
    },
    {
      path: '/ataques/editar/:id',
      name: 'ataques-editar',
      component: AtaqueEditView
    },
    {
      path: '/ataques/lista',
      name: 'ataques-lista',
      component: AtaqueListaView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
