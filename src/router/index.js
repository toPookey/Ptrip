import{createRouter, createWebHashHistory} from "vue-router"

const router = createRouter({
history: createWebHashHistory(),
routes: [
    {
        path:'/',
        redirect: "/home"
    },
    {
        path:'/home',
        component: () => import("@/Views/home/home.vue")
    },
    {
        path:'/favor',
        component: () => import("@/Views/favor/favor.vue")
    },
    {
        path:'/message',
        component: () => import("@/Views/message/message.vue")
    },
    {
        path:'/order',
        component: () =>  import("@/Views/order/order.vue")
    },
    {
        path:'/city',
        component: () =>  import("@/Views/city/city.vue"),
        // meta: {
        //     hideTabBar: true
        // }

    },
    {
        path:'/search',
        component: () =>  import("@/Views/search/search.vue")
    },
    {
        path:'/detail',
        component: () =>  import("@/Views/detail/detail.vue")
    },
]


})

export default router