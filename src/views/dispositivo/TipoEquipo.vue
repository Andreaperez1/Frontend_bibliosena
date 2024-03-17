<template>
    <v-row justify="center" class="crearProducto">
        <v-card justify="center"  class="card"  style="background-color: rgba(255, 255, 255, 0.5);">
        <v-row>
            <v-col>
                <row  class="text-center ti">
                    <v-card-title style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif ; font-size: 30px; text-align: center;"> Crear Tipo Equipo </v-card-title>
                </row>
                
                <v-row class="d-flex justify-center align-center">
                    <v-img class="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1c_jU-YYubQCXa5ZwMyiLmKE1D7FTctzUA&usqp=CAU"></v-img>
                </v-row>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="paquete.tipo" :counter="10" :rules="campoRules" label="Tipo"
                            required></v-text-field>

                            <v-row class="d-flex justify-center">
                                <v-btn color="#58D68D" class="w-33" @click="guardar" small>
                                    Guardar
                                </v-btn>
                            </v-row>

                    </v-form>
                </v-card-text>
            </v-col>

        </v-row>

        <div>
            <v-toolbar  height="90px" dark prominent style="background-color: #8BC34A" elevation="7">
            <v-toolbar-title class=" text-center color-text">Listado de Tipo Equipo</v-toolbar-title>
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

        <v-dialog  height="700px" width="500px" v-model="dialogoEditar">
            <v-card>
            <v-card-text>
                <v-form ref="formEditar"  lazy-validation>
                    <v-text-field v-model="paqueteEditar.tipo" :counter="10" :rules="campoRules" label="Tipo"
                        required></v-text-field>

                    <v-btn color="info" class="mr-8 lighten-2" @click="editarTipo()" small>
                        Editar
                    </v-btn>

                </v-form>
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
    <!-- Diálogo de éxito -->
    <v-dialog v-model="dialogoExito" max-width="400">
        <v-card>
          <v-card-title class="headline">Tipo Equipo Guardado</v-card-title>
          <v-card-text>
            Tipo de equipo guardado con exito.
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" text @click="dialogoExito = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

   
    <v-dialog v-model="dialogoEliminarTipo" max-width="500px" class="d-flex align-center justify-center">
  <v-card class="custom-card mx-auto" style="border: 4px">
    <v-card-title class="headline text-center">Eliminar Tipo Equipo</v-card-title>
    <v-card-text class="v-card__text">¿Estás seguro de que quieres eliminar este tipo de equipo?</v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" text @click="confirmarEliminarTipo" class="eliminar-button">Eliminar</v-btn>
      <v-btn color="success" text @click="dialogoEliminarTipo = false" class="cancelar-button">Cancelar</v-btn>
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
        dialogoExito:false,
        dialogoEliminarTipo: false,
        idTipoEliminar: null, 
        valid: true,
        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            tipo: null,

        },
        paqueteEditar: {
            id:null,
            tipo: null,

        },
        headers: [
            { text: "id", value: "id" },

            { text: "tipo ", value: "tipo" },

            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],


    }),

    methods: {
        guardar() {
            var vm = this;
            if (this.$refs.form.validate()) {
                axios
                    .post(" http://localhost:3000/tipo-equipo/crear", this.paquete)
                    .then(function (response) {

                        vm.dialogoExito = true;
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
                .get("http://localhost:3000/tipo-equipo/")
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
                tipo: item.tipo,
                id: item.id
            }

            

            },
            async deleteItem(id) {
        this.idTipoEliminar = id;
        this.dialogoEliminarTipo = true;
    },
    async confirmarEliminarTipo() {
    if (this.idTipoEliminar) {
        await axios.delete('http://localhost:3000/tipo-equipo/' + this.idTipoEliminar).then(response => {
            console.log(response.data);
            this.cargar();
        });
        this.dialogoEliminarTipo = false;
    }
},

        async editarTipo() {
            try {
                await axios.put('http://localhost:3000/tipo-equipo/actualizar',this.paqueteEditar).then(() => {
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
.c {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.ti {
    font-size: 48px;
    font-weight: 180px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serifS;
    text-align: center;
}

.image {
    max-width: 270px;
    height: 200px;
}

.color-text {
    color: #04080cd5;
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
.crearProducto{
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
      url("../../assets/fondo2.png");
      height: 300%;
  }
</style>
  