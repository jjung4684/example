import rentcarListComp from './components/rentcarList.vue';
import companyListComp from './components/rentcarCompanyList.vue';

export const routes = [
    { path : '', component: rentcarListComp },
    { path : '/detail', component: companyListComp}
]