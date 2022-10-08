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
]


})

export default router