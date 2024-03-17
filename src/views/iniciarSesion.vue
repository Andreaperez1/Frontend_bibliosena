<template>
  <v-app class="app">
    <v-app-bar app dark img src="../assets/fondo2.jpg" height="180">
      <v-row>
        <v-col cols="1">
          <img src="../assets/logos/fondo1.png" style="max-height: 270px; max-width: 400px" />
        </v-col>
        <v-col cols="10">
          <h1 class="let">Sistema De Prestamos</h1>
        </v-col>
        <v-col cols="1">
          <v-avatar style="margin-top: 80px">
            <img @click="dialog = true"
              src="https://img.freepik.com/vector-premium/retrato-avatar-hombre-joven-caucasico-marco-redondo-ilustracion-plana-dibujos-animados-vector_551425-19.jpg" />
          </v-avatar>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-carousel class="carusel" :show-arrows="false" cycle="">
        <v-carousel-item v-for="(item, i) in slider" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>

      <v-dialog v-model="dialog" max-width="350" height="400" persistent>
        <div class="container h-60">
          <div class="d-flex justify-content-center h-50">
            <div class="user_card">
              <div class="justify-content-center">
                <div class="brand_logo_container">
                  <img src="../assets/logos/fondo1.png" style="max-height: 300px; max-width: 400px" />
                </div>
              </div>
              <div class="d-flex justify-content-center form_container">
                <form v-on:submit.prevent>
                  <div class="input-group mb-3">
                    <div class="input-group-append">
                      <v-icon color="#057E28" style="margin: 0 7px; font-size: 30px">fas fa-user</v-icon>
                    </div>
                    <input v-model.number="paquete.cedula" type="number" name="" class="form-control input_user"
                      placeholder="Username" />
                  </div>
                  <div class="input-group mb-2">
                    <div class="input-group-append">
                      <v-icon color="#057E28" style="margin: 0 7px; font-size: 30px">fas fa-key</v-icon>
                    </div>
                    <input v-model="paquete.contrasena" type="password" name="" class="form-control input_pass"
                      placeholder="Password" />
                  </div>
                  <div class="d-flex justify-content-center mt-3 login_container" v-if="prueba == 0">
                    <vs-button color="#057E28" @click="login">Iniciar Sesión</vs-button>
                    <vs-button color="#057E28" @click="dialog = false">Cancelar</vs-button>
                  </div>
                </form>
              </div>
              <div class="mt-4">
                <div class="d-flex justify-content-center links">
                  <a href="#" style="color: black">¿olvidaste tu contraseña?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-dialog>
      <!-- Diálogo para usuario no registrado -->
      <v-dialog v-model="unregisteredDialog" max-width="350" persistent>
  <v-card class="custom-card">
    <v-card-title class="headline">Usuario no registrado</v-card-title>
    <v-card-text>
      Por favor verifica tus credenciales e intenta nuevamente.
    </v-card-text>
    <v-card-actions>
      <v-btn color="#057E28" text @click="unregisteredDialog = false">Cerrar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    </v-main>
    <v-container>
      <br />
      <center>
        <H1 class="recomended">RECOMENDADOS</H1>
      </center>
      <center>
        <p>
          <b>una seleccion especial para que no dejes de leer, escuchar, ver y
            jugar.</b>
        </p>
      </center>

      <v-sheet class="mx-auto" elevation="8" max-width="1026">
        <v-slide-group v-model="model" class="pa-4" active-class="success" show-arrows>
          <v-slide-item v-for="n in items2" :key="n">
            <v-card class="ma-6" height="300" width="190">
              <v-row class="fill-height" align="center" justify="center">
                <v-img height="320" :src="n"></v-img>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <v-row style="margin-top: 40px"></v-row>
      <v-row class="tar">
        <v-card class="mx-auto carta" max-width="500" margin-top="80px;">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.bibliotecas.ugto.mx/pages/images/pdomicilio.png">
            <v-card-title>Prestamo de libros</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se pide prestado un libro en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              La primera es de forma presencial en tu biblioteca más cercana,
              donde tendrás que presentar tu DNI y se te dará el carné de forma
              inmediata. Otra vía consiste en rellenar el formulario online
              correspondiente a tu red de bibliotecas.
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="black" text> Share </v-btn>

            <v-btn color="black" text> Explore </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto carta1" max-width="500">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.uaa.mx/portal/wp-content/uploads/2021/01/BOLETIN-10--1024x683.jpg">
            <v-card-title>Prestamo de computadores</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se utilizan las computadoras en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              Las computadoras públicas de la biblioteca permiten a los usuarios
              buscar una gran variedad de recursos electrónicos. Las
              computadoras con recursos de la biblioteca son exclusivamente para
              buscar las existencias de la biblioteca y las bases de datos
              electrónicas seleccionadas.
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="black" text> Share </v-btn>

            <v-btn color="black" text> Explore </v-btn>
          </v-card-actions>
        </v-card>

      </v-row>
    </v-container>
    <v-row style="margin-top: 40px"></v-row>
  
    <div>
      <v-footer color="green" class="footer text-center text-lg-start bg-custom text-muted">
    <v-container fluid>
      <v-row align="center">
        <!-- Primera sección -->
        <v-col cols="12" md="4">
          <div class="text-center mb-4">
            <v-img src="../assets/logos/fondo1.png" max-height="130" max-width="250"></v-img>
          </div>
          <p class="text-center" style="color: black;">
            El SBSENA está conformado por el Equipo de Gestión, quienes tienen a su cargo la formulación y gestión de proyectos, la implementación y sostenibilidad del Proyecto Biblioteca Digital.
          </p>
        </v-col>

        <!-- Segunda sección -->
        <v-col cols="12" md="4">
          <h4 class="mb-4 titulo-redes text-center">Contacto</h4>
          <div class="text-center">
            <p><i class="fas fa-home me-3"></i> Calle 24 con, Cra. 14, Montería, Córdoba</p>
            <p><i class="fas fa-envelope me-3"></i> info@example.com</p>
            <p><i class="fas fa-phone me-3"></i> (94) 7838050</p>
          </div>
        </v-col>

        <!-- Tercera sección -->
        <v-col cols="12" md="4">
          <h4 class="mb-4 titulo-redes text-center">Redes sociales</h4>
          <div class="text-center">
            <v-row align="center" justify="center">
              <v-icon color="#21618C" class="icono-redes">fab fa-facebook-f</v-icon>
              <v-icon color="#85C1E9" class="icono-redes">fab fa-twitter</v-icon>
              <v-icon color="#2ECC71" class="icono-redes">fab fa-whatsapp</v-icon>
              <v-icon color="#D2B4DE" class="icono-redes">fab fa-instagram</v-icon>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

</div>

  </v-app>
</template>
<script>
import axios from 'axios';
export default {
  name: "App",
  data: () => ({
    valid: true,


    active: "home",
    dialog: false,
    unregisteredDialog: false,
    noti: null,

    error: false,
    msg: "",
    isBusy: false,
    prueba: 0,
    array: [],
    rolMenu: [],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
    paquete: {
      cedula: null,
      contrasena: null
    },


    slider: [
      {
        src: require("../assets/carusel/biblioteca2.png"),
      },
      {
        src: require("../assets/carusel/biblioteca.png"),
      },
      {
        src: require("../assets/carusel/imag.png"),
      },
    ],
    items2: [
      {
        src: "https://stylelovely.com/wp-content/uploads/libros-el_desorden_que_dejas.jpg",
      },
      {
        src: "https://www.vanguardia.com/binrepository/1080x1080/0c0/0d0/none/12204/SFOQ/fdxvhv2xsayc2si_6472705_20211214130412.jpg",
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SfCBKYBiMAxi0tp89A0CbzdPsle4m5XoIw&usqp=CAU",
      },
      {
        src: "https://cdn.culturagenial.com/es/imagenes/a-fuego-lento-portada.jpg",
      },
    ],
  }),

  methods: {

    async login() {
  try {
    const response = await axios.post("http://localhost:3000/auth/login", this.paquete);
    if (response.data !== "") {
      this.$store.commit('setUser', response.data);
      this.$router.push("dashboard/welcome");
    } else {
      this.unregisteredDialog = true;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      this.unregisteredDialog = true;
    } else {
      console.error("Error en la solicitud:", error);
      this.error = true;
      this.msg = "Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
    }
  } finally {
    this.$refs.form.reset();
  }
}
  }}
</script>

<style scoped>
.botoninicio {
  background-color: #28B463;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 55px;
}

.titulo {
  color: rgb(8, 4, 4);
  font-size: 16px;
  font-weight: bold;
  margin-top: 55px;
  font-family: "times new roman", 'cursive';
}

.let {
  font-family: Times, 'Times New Roman', serif;
  margin-top: 80px;
  font-size: 60px;
  text-align: center;
  color: rgb(16, 95, 13);


}

.tar {
  font-family: "times new roman", 'cursive';
}

footer{
background-color: #057E28;
    border: 2px solid black; 
    padding: 20px; 
}

.custom-card {
  border: 2px solid #057E28; 
  border-radius: 10px; 
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2); 
}

.custom-card .headline {
  color: #057E28; 
}

.custom-card .v-btn {
  color: #057E28; 
}

.logo {
  margin-top: 25px;
}

.fondo2 {
  background-image: url("../assets/fondoTimeLine.png");
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
}

.fondoGeneral {
  background-image: url(../assets/fondo.png);
  background-size: 100% 100%;
  background-attachment: fixed;
  margin: 0;
}

.letras {
  color: white;
  margin: auto;
  text-align: center;
  font: bold 80px/1 arial;
  text-transform: uppercase;
  color: rgb(244, 244, 244);
  text-shadow: 0 2px 0 black, 0 4px 0 black, 0 6px 0 black, 0 8px 0 black,
    0 10px 0 black, 0 12px 0 black;
}

.letras2 {
  font-size: 25px;
  color: black;
  margin: auto;
  text-align: justify;
  font-family: "Mystery Quest", cursive;
}

@import url("https://fonts.googleapis.com/css?family=Mystery+Quest");

.user_card {
  height: 500px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #ffffffb9;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  margin-top: 70px;
}

.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
  margin-top: 16px;
}

.form_container {
  margin-top: 100px;
}

.login_btn {
  width: 100%;
  background: #0079c4 !important;
  color: #ffffff !important;
  font-weight: 700;
}

.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.login_container {
  padding: 0 2rem;
}

.input-group-text {
  background: #0079c4 !important;
  color: #ffffff !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}

.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
  background-color: #c0392b !important;
}

.app {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.titulo-redes {
  font-size: 20px;
  text-align: center;
  color: #0e0808; /* Color de texto para el título */
}


.icono-redes {
  margin: 20px;
  font-size: 30px;
}
</style>