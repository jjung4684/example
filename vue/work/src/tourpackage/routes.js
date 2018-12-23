import tourPackageMainComp from './components/tourPackageMainComp.vue';
import tourPackageListComp from './components/tourPackageListComp.vue';

export const routes = [
    { path : '/MW/Tour/getTourDisplay.tmall', component: tourPackageMainComp , alias:'/' },
    { path : '/MW/Tour/getTourDisplay/list.tmall', name:'list', component: tourPackageListComp}
]