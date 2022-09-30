import { createRouter, createWebHistory } from 'vue-router'
import PokemonListaView from '../views/pokemon/PokemonListaView.vue'
import TipoNovoView from '../views/tipo/TipoNovoView.vue'
import TipoEditarView from '../views/tipo/TipoEditarView.vue'
import TipoListaView from '../views/tipo/TipoListaView.vue'
import AtaqueNovoView from '../views/ataque/AtaqueNovoView.vue'
import AtaqueEditView from '../views/ataque/AtaqueEditView.vue'
import AtaqueListaView from '../views/ataque/AtaqueListaView.vue'

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
      component: TipoListaView,
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
