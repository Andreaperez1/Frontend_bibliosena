<template>
  <v-navigation-drawer v-model="drawer" app class="fon" width="320px">
    <vuescroll :ops="ops">
      <v-img
        src="../../assets/logos/fondo1.png"
        cover
        class="margen"
        max-height="250"
        aspect-ratio="1.7"
        
      >
      </v-img>
      
      <v-divider> </v-divider>

      <sidebar-menu showOneChild :menu="menu" />
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>

import {SidebarMenu} from "vue-sidebar-menu";
import vuescroll from "vuescroll";
const menuB = require('../../json/menu').default;

export default {
  components: {
    SidebarMenu,
    vuescroll,
  },

  props: ["drawer"],
  data: () => ({
    ops: {
      scrollPanel: {
        initialScrollY: false,
        initialScrollX: false,
        scrollingX: false,
        scrollingY: true,
        speed: 300,
        easing: undefined,
        verticalNativeBarPos: "right",
      },
      rail: {
        background: "rgba(0, 0, 0, 0.158)",
        opacity: 1,
        size: "10px",
        specifyBorderRadius: false,
        gutterOfEnds: null,
        gutterOfSide: "2px",
        keepShow: false,
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: "#0378a677",
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: 0,
        size: "9px",
        disable: false,
      },
    },

    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],

    menu: [],
  }),
   created(){
  
    const rol = this.$store.getters.getRol;
    if(rol == null){
      this.$router.push('/');
    }
    switch (rol) {
      case 'Administrador':
        this.menu = menuB.Admin
        break;
        case 'Instructor':
        this.menu = menuB.Instructor
        break;
    
      default:
        break;
    }
   }, 
};
</script>
<style scoped>
.fon {
  background-image: url("../../assets/fondo4.png");
  background-size: 100% 100%;
  width: 100%;
  height: auto;
  margin: 0;
}

.margen {
  margin-top: 45px;
}

.v-sidebar-menu.vsm-default .vms-header {
 text-align: center;
  color: black !important;
}


</style>