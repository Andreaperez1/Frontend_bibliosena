<template>
    <v-row  justify="center" class="crearProducto">
        <v-card justify="center" max-width="1000" style="background-color: rgba(255, 255, 255, 0.5);">
            <v-row class="d-flex justify-center ti">
             <v-card-title class=" ti"> Roles </v-card-title>
            </v-row>
                <v-row class="d-flex justify-center align-center" style="font-size: 48px;">
                    <v-img class="image" src="https://impulso06.com/wp-content/uploads/2023/02/Roles-en-un-equipo-de-trabajo-1024x1024.png"></v-img>
                </v-row>
               <br>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.descripcion" :counter="10" :rules="campoRules" label="descripcion"
                            required></v-text-field>

                            <v-row class="d-flex justify-center">
                                <v-btn color="#1B9F4E" class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            </v-row>

                    </v-form>
                </v-card-text>
                <br><br>

       
        <v-toolbar  height="90px" dark prominent color="#8BC34A " elevation="16">
            <v-toolbar-title class=" text-center color-text">Listado de Roles</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
       <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
    <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item.id)">
            mdi-delete
        </v-icon>
    </template>
</v-data-table>


        <v-dialog  height="700px" width="500px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.descripcion" :counter="10" :rules="campoRules" label="descripcion"
                        required></v-text-field>

                    <v-btn color="info" class="mr-8 lighten-2" @click="editarRol()" small>
                        Editar
                    </v-btn>

                </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>

     <!-- Diálogo de éxito al agregar un rol -->
     <v-dialog v-model="dialogoAgregarRol" max-width="500px" class="d-flex align-center justify-center">
                <v-card class="custom-card mx-auto" style="border: 4px">
                    <v-card-title class="headline text-center">Rol Agregado</v-card-title>
                    <v-card-text class="v-card__text">¡Rol agregado con éxito!</v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn color="success" text @click="dialogoAgregarRol = false">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </v-card>

    <v-dialog v-model="dialogoEliminarRol" max-width="500px" class="d-flex align-center justify-center">
  <v-card class="custom-card mx-auto" style="border: 4px">
    <v-card-title class="headline text-center">Eliminar Rol</v-card-title>
    <v-card-text class="v-card__text">¿Estás seguro de que deseas eliminar este rol?</v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" text @click="confirmarEliminarRol" >Eliminar</v-btn>
      <v-btn color="sucxess" text @click="dialogoEliminarRol = false" >Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    </v-row>
   
</template>
  
<script>
import axios from "axios";
export default {
    data: () => ({
        dialogoEditar: false,
        dialogoAgregarRol: false,
        dialogoEliminarRol: false,
        idRolAEliminar: null, 
        valid: true,

        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            descripcion: null,

        },
        paqueteEditar: {
            id:null,
            descripcion: null,

        },
        headers: [
            { text: "Id", value: "id" },

            { text: "Descripcion", value: "descripcion" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],
    }),

    methods: {
    guardar() {
        var vm = this;
        if (this.$refs.form.validate()) {
            axios
                .post("http://localhost:3000/rol/crear", this.paquete)
                .then(function (response) {
                  vm.dialogoAgregarRol = true;
                    console.log(response)
                    vm.cargar()
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    vm.$refs.form.reset();
                });
        }
    },
    async cargar() {
        var vm = this
        await axios
            .get("http://localhost:3000/rol/")
            .then(function (response) {
                // handle success
                vm.datos = response.data;
                console.log(vm.datos);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    },
    editItem(item) {
        console.log(item);
        this.dialogoEditar = true;
        this.paqueteEditar = {
            id_rol: item.id_rol,
            descripcion: item.descripcion
        }
    },
    async deleteItem(id) {
        this.idRolAEliminar = id;
        this.dialogoEliminarRol = true;
    },
    async confirmarEliminarRol() {
        if (this.idRolAEliminar) {
            // Realiza la eliminación del rol
            await axios.delete('http://localhost:3000/rol/' + this.idRolAEliminar).then(response => {
                console.log(response.data);
                this.cargar();
            });
            this.dialogoEliminarRol = false;
        }
    },
    async editarRol() {
        try {
            await axios.put('http://localhost:3000/rol/actualizar', this.paqueteEditar).then(() => {
                this.dialogoEditar = false;
                this.cargar();
            });
        } catch (error) {
            this.dialogoEditar = false;
            alert(error);
        }
    }
},

    mounted() {
        this.cargar();
    },
};
</script>

  
<style>
.crearProducto{
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
      url("../../assets/fondo2.png");
  }
.c {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.ti {
    font-size: 58px;
    font-weight: 180px;
    font-family:  Times, 'cursive';
    text-align: center;
}

.image {
    max-width: 300px;
    height: 200px;
}

.color-text {
    color: #04080cd5;
  }

  .card{
    width:50%;
    height: 35%;
    
}
.custom-card {
    border: 4px solid #057E28; 
    border-radius: 10px; 
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2); 
  }
  
  .v-card__title.headline {
    background-color: #f0f0f0; 
  }
  
  .v-card__text {
    color: #333; 
  }
  
  .v-card__actions .v-btn.success {
    background-color: transparent; 
  }

  .eliminar-button {
    background-color: #057E28 !important; 
  }

  .eliminar-button .v-btn__content {
    color: white !important; }

  .cancelar-button {
    background-color: #057E28 !important; 
  }

  .cancelar-button .v-btn__content {
    color: white !important; }
  

</style>