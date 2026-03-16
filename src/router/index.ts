import Gledalac from '@/Gledalac.vue'
import GledalacEdit from '@/GledalacEdit.vue'
import GledalacNew from '@/GledalacNew.vue'
import Home from '@/Home.vue'
import RezervacijaEdit from '@/RezervacijaEdit.vue'
import RezervacijaNew from '@/RezervacijaNew.vue'
import Rezervacije from '@/Rezervacije.vue'
import TerminEdit from '@/TerminEdit.vue'
import Termini from '@/Termini.vue'
import TerminNew from '@/TerminNew.vue'
import TimDetails from '@/TimDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: Home,
      meta: { title: 'Početna' }
    },
    {
      path: '/details/:id',
      component: TimDetails,
      meta: { title: 'Detelji o timu' }
    },
    {
      path: '/gledaoci',
      component: Gledalac,
      meta: { title: 'Gledaoci' }
    },
    {
      path: '/gledaoci/new',
      component: GledalacNew,
      meta: { title: 'Kreiranje Gledaoca' }
    },
    {
      path: '/gledaoci/edit/:id',
      component: GledalacEdit,
      meta: { title: 'Izmena Gledaoca' }
    },
    {
      path: '/rezervacije',
      component: Rezervacije,
      meta: { title: 'Rezervacije' }
    },
    {
      path: '/rezervacije/new',
      component: RezervacijaNew,
      meta: { title: 'Kreiranje Rezervacije' }
    },
    {
      path: '/rezervacije/edit/:id',
      component: RezervacijaEdit,
      meta: { title: 'Izmena Rezervacije' }
    },
    {
      path: '/utakmice',
      component: Termini,
      meta: { title: 'Utakmice' }
    },
    {
      path: '/utakmice/new',
      component: TerminNew,
      meta: { title: 'Kreiranje Utakmice' }
    },
    {
      path: '/utakmice/edit/:id',
      component: TerminEdit,
      meta: { title: 'Izmena Utakmice' }
    }
    

  ],
})

export default router
