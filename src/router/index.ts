import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ItemDetail from "@/views/ItemDetail.vue";

const routes: readonly RouteRecordRaw[] = [
    {
        path: "/",
        name: 'home',
        component: HomeView
    },
    {
        path: '/item-contact/:id',
        name: 'detail',
        component: ItemDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router