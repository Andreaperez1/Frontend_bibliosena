<template>
    <v-row justify="center" class="crearProducto">
    <v-card justify="center"  class="card"  style="background-color: rgba(255, 255, 255, 0.5);">
                <v-card-title class=" ti" > Crear Estado Equipo </v-card-title>
                <br>
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://pcpcsolutions.com/images/pcmantenimiento.png"></v-img>
                </v-row>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.estado" :counter="10" :rules="campoRules" label="Estado"
                            required></v-text-field>
                            <br>
                            <v-row class="d-flex justify-center">
                                <v-btn height="35px" width="120px"  color="#2ECC71" style="color: #fff ;font-size: 18px"   class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            </v-row>
                            <br>
                    </v-form>
                </v-card-text>

        <div>
        <v-toolbar  height="90px" dark prominent style="background-color: #8BC34A " elevation="7">
            <v-toolbar-title class=" text-center color-text">Listado de Estado Equipo</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table :headers="headers" :items="datos" :items-per-page="5" style="background-color: transparent;" class="elevation-1">
            
            
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item.id)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <v-dialog  height="500px" width="700px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.estado" :counter="10" :rules="campoRules" label="Estado"
                        required></v-text-field>

                    <v-btn color="success" class="mr-8 lighten-2" @click="editarEstado()" small>
                        Editar
                    </v-btn>

                </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>
        </div>
    </v-card>
   <v-dialog v-model="dialogoExito" max-width="400">
  <v-card>
    <v-card-title class="headline">Estado Equipo Guardado</v-card-title>
    <v-card-text>
      Estado del equipo guardado con éxito.
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" text @click="dialogoExito = false">Aceptar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- Diálogo de confirmación para eliminar rol -->
<v-dialog v-model="dialogoEliminarRol" max-width="500px" class="d-flex align-center justify-center">
    <v-card class="custom-card mx-auto" style="border: 4px">
      <v-card-title class="headline text-center">Confirmar Eliminación</v-card-title>
      <v-card-text class="v-card__text">¿Estás seguro de que quieres eliminar este rol?</v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="error" text @click="confirmarEliminarRol" class="eliminar-button">Eliminar</v-btn>
        <v-btn color="primary" text @click="dialogoEliminarRol = false" class="cancelar-button">Cancelar</v-btn>
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
        dialogoExito: false,
        dialogoEliminarEstado: false,
    estadoEquipoEliminarId: null,
        valid: true,
        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            estado: null,

        },
        paqueteEditar: {
            id:null,
            estado: null,

        },
        headers: [
            { text: "Id", value: "id" },

            { text: "Estado", value: "estado" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],


    }),

    methods: {
    guardar() {
        var vm = this;
        if (this.$refs.form.validate()) {
            axios
                .post("http://localhost:3000/estado-equipo/crear", this.paquete)
                .then(function (response) {
                    vm.dialogoExito = true; 
                    console.log(response);
                    vm.cargar();
                })
                .catch(function (error) {
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
                .get("http://localhost:3000/estado-equipo/")
                .then(function (response) {
                    vm.datos = response.data;
                    console.log(vm.datos);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });


        },
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;
            this.paqueteEditar = {
                estado: item.estado,
                id : item.id
            }
            },
            async deleteItem(id) {
      this.estadoEquipoEliminarId = id;
      this.dialogoEliminarEstado = true;
    },
    async eliminarEstadoEquipo() {
      await axios.delete('http://localhost:3000/estado-equipo/' + this.estadoEquipoEliminarId)
        .then(response => {
          console.log(response.data);
          this.cargar();
          this.dialogoEliminarEstado = false;
        })
        .catch(error => {
          console.error('Error al eliminar el estado de equipo:', error);
          this.dialogoEliminarEstado = false;
        });
    },
        async editarEstado() {
            try {
                await axios.put('http://localhost:3000/estado-equipo/actualizar',this.paqueteEditar).then(() => {
                this.dialogoEditar = false;
                this.cargar()
                ;
            });

            }
            catch (error) {
                this.dialogoEditar = false;
                alert(error);
            }
            
        }

    },
    mounted() {
        this.cargar()




    },
};
</script>
  
<style>

.crearProducto{
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
      url("../../assets/fondo2.png");
      height: 300%;
  }
.ti {
    color: rgb(8, 4, 4);
    font-size: 36px;
    font-family: "times new roman", cursive;
    text-align: center !important;
  }

.image {
    max-width: 230px;
    height: 200px;
}

.color-text {
    color: #fff;
  }
.card{
    width:50%;
    height: 35%;
    border-radius: 10px; 
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.2); 
    
}

.v-card__text {
  color: #333; 
}


</style>
  