<template>
    <v-row justify="center" class="crearProducto">
        <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
            <br>
            <v-row max-width="50%" class=" justify-center">
                <v-card-title style="font-size: 50px; font-family:'Times New Roman', Times, cursive"> Crear Equipo
                </v-card-title>
            </v-row>
            <br>
            <br>
            <v-row class="d-flex justify-center align-center">
                <v-img class="image"
                    src="https://st2.depositphotos.com/1001877/5328/i/450/depositphotos_53286999-stock-photo-computer-devices-mobile-phone-laptop.jpg"></v-img>

            </v-row>
            <br>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-select v-model="paquete.id_tipo" :items="tipoDB" item-text="tipo" item-value="id"
                        :rules="campoRules" label="Tipo" required>
                    </v-select>
                    <v-text-field v-model="paquete.serial" :rules="campoRules" label="Serial" required>
                    </v-text-field>

                    <v-text-field v-model="paquete.serialtelefonico" :rules="campoRules" label="Serial Telefonico"
                        required v-if="paquete.id_tipo == 1">
                    </v-text-field>

                    <v-text-field v-model="paquete.descripcion" :rules="campoRules" label="Descripción" required>
                    </v-text-field>
                    <br>
                    <v-row class="d-flex justify-center">
                        <v-btn height="35px" width="120px" justify="center" color=" aliceblue"
                            style="color: #508d42 ;font-size: 18px" class="mr-12 lighten-2" @click="guardar" small>
                            guardar
                        </v-btn>
                    </v-row>
                    <br>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-file-input v-model="file" label="Seleccionar archivo" accept=".xlsx"
                                    :rules="[fileRules]"></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-btn @click="uploadFile" color="green">Subir archivo</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>

            </v-card-text>
            <div justify="center">
                <v-toolbar dark prominent color="#8BC34A " elevation="7">
                    <v-toolbar-title class="t">Listado de Dispositivos</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-data-table :headers="headers" :items="datos" :items-per-page="5"
                    style="background-color: transparent;" class="elevation-1">
                    <template v-slot:item.actions="{ item }">
                        <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">
                            mdi-pencil
                        </v-icon>
                        <v-icon small @click="deleteItem(item.id)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
                <v-dialog height="500px" width="700px" v-model="dialogoEditar">
                    <v-card>
                        <v-card-text>
                            <v-form ref="formEditar" lazy-validation>
                                <v-select v-model="paqueteEditar.id_tipo" :items="tipoDB" item-text="tipo"
                                    item-value="id" :rules="campoRules" label="Tipo" required>
                                </v-select>
                                <v-text-field v-model="paqueteEditar.serial" :counter="10" :rules="campoRules"
                                    label="Serial" required>
                                </v-text-field>
                                <v-text-field v-model="paqueteEditar.serialtelefonico" :counter="10" :rules="campoRules"
                                    label="Serial Telefonico" required>
                                </v-text-field>
                                <v-text-field v-model="paqueteEditar.descripcion" :counter="10" :rules="campoRules"
                                    label="Descripcion" required>
                                </v-text-field>

                                <v-select v-model="paqueteEditar.id_estado" :items="estadosDb" item-text="estado"
                                    item-value="id" :rules="campoRules" label="Estado" required>
                                </v-select>

                                <v-btn color="success" class="mr-8 lighten-2" @click="editarEquipo()" small>
                                    Editar
                                </v-btn>

                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
            <v-dialog v-model="dialogoEquipoRegistrado" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Equipo Registrado</v-card-title>
                    <v-card-text>
                        ¡El equipo se ha registrado correctamente!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="sucess" @click="dialogoEquipoRegistrado = false">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <v-dialog v-model="dialogoEliminar" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Confirmar eliminación</v-card-title>
                    <v-card-text>
                        ¿Estás seguro de que quieres eliminar este equipo?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="#057E28" text @click="eliminarEquipo">Confirmar</v-btn>
                        <v-btn color="#057E28" text @click="dialogoEliminar = false">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogoExito" max-width="500px">
                <v-card>
                    <v-card-title >Éxito</v-card-title>
                    <v-card-text>
                        El archivo se ha cargado correctamente.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="sucess" @click="dialogoExito = false">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialogoError" max-width="500px">
                <v-card>
                    <v-card-title >Error</v-card-title>
                    <v-card-text>
                        Ha ocurrido un error al cargar el archivo. Por favor, inténtelo de nuevo.
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="sucess" @click="dialogoError = false">Aceptar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </v-row>
</template>
<script>
import axios from "axios";
export default {
    data: () => ({
        dialogoEquipoRegistrado: false,
        dialogoEditar: false,
        dialogoEliminar: false,
        idEquipoEliminar: null,
        dialogoExito: false,
        dialogoError: false,
        valid: true,
        campoRules: [(v) => !!v || "Campo Requerido"],

        paquete: {
            id: null,
            serial: null,
            serialtelefonico: null,
            descripcion: null,
            id_estado: 1,
            id_tipo: null,
        },
        return: {
            file: null,
            fileRules: [
                value => !!value || 'El archivo es requerido',
                value => !value || value.size < 2097152 || 'El archivo no debe ser mayor de 2 MB',
            ],
        },


        estadosDb: [],
        tipoDB: [],

        paqueteEditar: {
            id: null,
            serial: null,
            serialtelefonico: null,
            descripcion: null,
            id_estado: null,
            id_tipo: null,
        },
        headers: [
            { text: "Id", value: "id" },
            { text: "Tipo", value: "id_tipo.tipo" },
            { text: "Serial", value: "serial" },
            { text: "Serial Telefonico", value: "serialtelefonico" },
            {
                text: "Descripcion",
                align: "start",
                sortable: false,
                value: "descripcion",
            },

            { text: "Estado", value: "id_estado.estado" },
            { text: 'Actions', value: 'actions', sortable: false },

        ],
        datos: [],
    }),

    methods: {
        guardar() {
            var vm = this;
            if (this.$refs.form.validate()) {
                axios
                    .post("http://localhost:3000/equipo/crear", this.paquete)
                    .then(function (response) {
                        vm.dialogoEquipoRegistrado = true;
                        console.log(response)
                        vm.cargar()
                    })
                    .catch(function (error) {
                        alert(error);
                        console.log(error);
                    })
                    .finally(function () {
                        vm.$refs.form.reset();
                    });
            }
        },
        uploadFile() {
      if (this.file) {
        const formData = new FormData();
        formData.append('file', this.file);
        // Envía la solicitud al servidor para procesar el archivo Excel
        axios.post('http://localhost:3000/equipo/crearUpload', formData)
          .then(response => {
            this.dialogoExito = true;
            console.log('Equipos creados exitosamente:', response.data);
          })
          .catch(error => {
            this.dialogoError = true;
            console.error('Error al cargar el archivo:', error);
          });
      }
    },
        async listarEstados() {
            await axios.get('http://localhost:3000/estado-equipo/').then(resp => {
                this.estadosDb = resp.data;
            })
        },
        async listarTipos() {
            await axios.get('http://localhost:3000/tipo-equipo/').then(resp => {
                this.tipoDB = resp.data;
            })

        },
        editItem(item) {
            console.log(item);
            this.dialogoEditar = true;

            this.paqueteEditar = {
                id_estado: item.id_estado.id,
                id_tipo: item.id_tipo.id,
                descripcion: item.descripcion,
                serial: item.serial,
                id: item.id
            }
        },

        async cargar() {
            var vm = this
            await axios
                .get("http://localhost:3000/equipo/")
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

        async deleteItem(id) {
            this.idEquipoEliminar = id;
            this.dialogoEliminar = true;
        },
        eliminarEquipo() {
            axios.delete('http://localhost:3000/equipo/' + this.idEquipoEliminar)
                .then(response => {
                    console.log(response.data);
                    this.cargar();
                })
                .catch(error => {
                    console.error('Error al eliminar el equipo:', error);
                })
                .finally(() => {
                    this.dialogoEliminar = false;
                });
        },
        async editarEquipo() {
            try {
                await axios.put('http://localhost:3000/equipo/actualizar', this.paqueteEditar).then(() => {
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
        this.cargar();
        this.listarEstados();
        this.listarTipos();
        this.adjuntarArchivo();
        var vm = this;
        axios
            .get("http://localhost:3000/equipo")
            .then(function (response) {
                // handle success
                vm.datos = response.data;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
};
</script>
<style>
.crearProducto {
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
        url("../../assets/fondo2.png");
}

.image {
    max-width: 400px;
    height: 250px;
}

.card {
    width: 50%;
    height: 35%;

}
</style>