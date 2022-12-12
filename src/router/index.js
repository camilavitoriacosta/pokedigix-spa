import { createRouter, createWebHistory } from 'vue-router'
const PokemonListaView = () => import('@/views/pokemon/PokemonListaView.vue');
const TreinadorListaView = () => import('@/views//treinador/TreinadorListaView.vue');
const TreinadorNovoView = () => import('@/views//treinador/TreinadorNovoView.vue');
const TreinadorPerfilView = () => import('@/views//treinador/TreinadorPerfilView.vue');
const PokemonNovoView = () => import('@/views//pokemon/PokemonNovoView.vue');
const TipoNovoView = () => import('@/views//tipo/TipoNovoView.vue');
const TipoEditarView = () => import('@/views//tipo/TipoEditarView.vue');
const TipoListaView = () => import('@/views//tipo/TipoListaView.vue');
const AtaqueNovoView = () => import('@/views//ataque/AtaqueNovoView.vue');
const AtaqueEditView = () => import('@/views//ataque/AtaqueEditView.vue');
const AtaqueListaView = () => import('@/views//ataque/AtaqueListaView.vue');
const PageNotFound = () => import('@/views/PageNotFound.vue');
const SignUpView = () => import('@/views/SignUpView.vue');
const LoginView = () => import('@/views/LoginView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: PageNotFound
    },
    {
      path: '/',
      name: 'home',
      component: PokemonListaView
    },
    {
      path: '/treinadores/lista',
      name: 'treinadores-lista',
      component: TreinadorListaView
    },
    {
      path: '/treinadores/perfil/:id',
      name: 'treinador-perfil',
      component: TreinadorPerfilView
    },
    {
      path: '/treinadores/novo',
      name: 'treinadores-novo',
      component: TreinadorNovoView
    },
    {
      path: '/pokemons/lista',
      name: 'pokemons-lista',
      component: PokemonListaView
    },
    {
      path: '/pokemons/novo',
      name: 'pokemons-novo',
      component: PokemonNovoView
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
      path: '/usuarios/novo',
      name: 'sign-up',
      component: SignUpView
    }, {
      path: '/usuarios/login',
      name: 'sign-in',
      component: LoginView
    }
  ]
})

export default router
