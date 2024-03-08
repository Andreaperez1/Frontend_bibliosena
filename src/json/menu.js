

let menu =
{
  Admin: [
    {
      header: "Main Navigation",
       title: "Menú Principal",
      hiddenOnCollapse: true,
    },
    {
      title: "Usuario",
      icon: "fas fa-user",
      child: [
        {
          href: '/dashboard/usuariocrear',
          title: "Registrar Usuario",
        },

        {
          href: "/dashboard/rol",
          title: "Rol",
        },
        {
          href: '/dashboard/estadousuario',
          title: "Estado Usuario",
        },
        {
          href: '/dashboard/usuario',
          title: "Listar Usuario",
        },
      ],
    },
    {
      title: "Registro Dispositivo",
      icon: "fa fa-archive",
      child: [
        {
          href: "/dashboard/crearequipo",
          title: "Registrar Equipo ",
        },
        {
          href: "/dashboard/estadoequipo",
          title: "Estado Equipo",
        },
        {
          href: "/dashboard/tipoequipo",
          title: "Tipo Equipo",
        },

      ],
    },
    {
      title: "Prestamos Dispositivos",
      icon: "fa fa-cogs",
      child: [

        {
          href: "/dashboard/EstadoPrestamo",
          title: "Estado Prestamo",
        },
        {
          href: "/dashboard/EntregaPrestamo",
          title: "Entrega Prestamo",
        },
        {
          href: "/dashboard/DevolucionPrestamo",
          title: "Devolucion Prestamo",
        },

      ],
    },



  ],
  Instructor: [
    {
      header: "Main Navigation",
      title: "Menú Principal",
      hiddenOnCollapse: true,
    },

    {
      title: "Prestamos Dispositivos",
      icon: "fa fa-cogs",
      child: [
        {
          href: "/dashboard/prestamodispositivo",
          title: "Registro",
        },
        {
          href: "/dashboard/listarprestamo",
          title: "Mis Prestamos",
        },

      ],
    },

  ]
}

module.exports = menu;