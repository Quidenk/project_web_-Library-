import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('@/view/Home.vue'),
        meta: { title: 'Home' },
    },

    {
        path: "/bookpage",
        name: "bookpage",
        component: () => import('@/view/BooksPage.vue'),
        meta: { title: 'BookPage' },
    },
    
    {
        path: "/manage",
        name: "manage",
        component: () => import('@/view/admin/Manege.vue'),
        meta: { title: 'Admin' },
        beforeEnter: (to, from, next) => {
            // Check if the user is logged in
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert("You must login before access this page")
                next({name: 'login-admin'});
            } else {
                // Check if the user is an admin
                const role = user.position;
                if (role === true) {
                    // Allow access for admin users
                    next()
                } else {
                    alert("Just admin can be access this page")
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    next('/')
                }
            }
        },
        children: [
            
            {
                path: "user-management",
                name: "user-management",
                component: () => import("@/components/admin/UserManagement.vue"),
            },

            {
                path: "book-management",
                name: "book-management",
                component: () => import("@/components/admin/BookManagement.vue"),
            },

            {
                path: "add-book",
                name: "add-book",
                component: () => import("@/components/admin/BookAdd.vue"),
            },

            {
                path: "book-form/:id",
                name: "book-form",
                component: () => import("@/components/admin/BookForm.vue"),
            },

    //         {
    //             path: "overall",
    //             name: "overall",
    //             component: () => import("@/components/OverallPage.vue")
    //         },

    //         {
    //             path: "order",
    //             name: "order",
    //             component: () => import("@/components/OrderPage.vue")
    //         },
        ]
    },

    {
        path: "/login",
        name: "login",
        component: () => import('@/view/user/UserLogin.vue'),
        meta: { title: 'Login' },
    },

    {
        path: "/adminlogin",
        name: "adminlogin",
        component: () => import('@/view/admin/AdminLogin.vue'),
        meta: { title: 'Login' },
    },

    {
        path: "/register",
        name: "register",
        component: () => import('@/view/user/UserRegister.vue'),
        meta: { title: 'Register' },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
