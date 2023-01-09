import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProductView from '../views/AddProductView.vue'
import SinglePageView from '../views/SinglePageView.vue'
import ReportMessageView from '../views/ReportMessageView.vue'
import AmountLogView from '../views/AmountLogView.vue'
import ProductCategoriesView from '../views/ProductCategoriesView.vue'
import ArchiveView from '../views/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-product',
      name: 'AddProductView',
      component: AddProductView
    },
    {
      path: '/single/:id',
      name: 'single',
      component: SinglePageView
    },
    {
      path: '/report',
      name: 'ReportMessage',
      component: ReportMessageView
    },
    {
      path: '/log',
      name: 'AmountLog',
      component: AmountLogView
    },
    {
      path: '/product-categories',
      name: 'ProductCategories',
      component: ProductCategoriesView
    },
    {
      path: '/archive',
      name: 'Archive',
      component: ArchiveView
    }
    
  ]
})

export default router
