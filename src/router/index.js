import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'



Vue.use(VueRouter)

//rutas de elementos del sidebar
const routes = [{
    path: '/',
    name: 'Login',
    component: () =>
        import('../views/iniciarSesion.vue')

},

{
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import('../views/dashboard'),
    children: [
        {
            name: 'DashboardWelcome',
            path: '/dashboard/welcome',
            component: () =>
                import('../views/welcome.vue'),

                
        },
        {
            name: 'DashboardSalir',
            path: '/dashboard/salir',
            component: () =>
                import('../views/welcome.vue'),
                beforeEnter:(_, __, next)=>{
                    store.commit('setUser', null)
                    next('/')
                }
                
                
        },
      

        {
            name: 'Dashboarmanager',
            path: '/dashboard/crearequipo',
            component: () =>
                import('../views/dispositivo/CrearEquipo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
                

        },

        {
            name: 'DashboardPrestamodispositivo',
            path: '/dashboard/prestamodispositivo',
            component: () =>
                import('../views/dispositivo/PrestamoDispositivo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Instructor'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboardListarPrestamo',
            path: '/dashboard/listarprestamo',
            component: () =>
                import('../views/dispositivo/ListaPrestamo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Instructor'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboardEntregaPrestamo',
            path: '/dashboard/entregaprestamo',
            component: () =>
                import('../views/dispositivo/EntregaPrestamo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboardDevolucionPrestamo',
            path: '/dashboard/devolucionprestamo',
            component: () =>
                import('../views/dispositivo/DevolucionPrestamo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboardEstadoEquipo',
            path: '/dashboard/estadoequipo',
            component: () =>
                import('../views/dispositivo/EstadoEquipo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboardTipoEquipo',
            path: '/dashboard/tipoequipo',
            component: () =>
                import('../views/dispositivo/TipoEquipo.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        
       
        {
            name: 'DashboardUsuario',
            path: '/dashboard/usuario',
            component: () =>
                import('../views/dispositivo/ListarUsuario.vue'),
        },     {
            name: 'DashboardRol',
            path: '/dashboard/rol',
            component: () =>
                import('../views/dispositivo/Rol.vue'),
                 beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
        {
            name: 'DashboarUsuarioCrear',
            path: '/dashboard/usuariocrear',
            component: () =>
                import('../views/Usuario.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
      
        {
            name: 'DashboardEstadoUsuario',
            path: '/dashboard/estadousuario',
            component: () =>
                import('../views/dispositivo/EstadoUsuario.vue'),
                beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },       
        {
            name: 'DashboardEstadoPrestamo',
            path: '/dashboard/estadoprestamo',
            component: () =>
                import('../views/dispositivo/EstadoPrestamo.vue'),
                 beforeEnter:(_, __, next)=>{
                    let rol = store.getters.getRol
                    if(rol == 'Administrador'){
                        next()
                    }else{
                        return next('/')
                    }
                }
        },
     
        

    ],
},


]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router