<template>
  <v-row justify="center" class="crearProducto">
    <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
      <v-row>
        <v-col>
          <v-card-title class="text-center ti">Estado Usuario</v-card-title>
          <v-row class="d-flex justify-center align-center">
            <v-img class="image" src="https://pcpcsolutions.com/images/pcmantenimiento.png"></v-img>
          </v-row>
          <v-divider></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="paquete.estado" :counter="10" :rules="campoRules" label="Estado" required></v-text-field>

              <v-card-text class="text-center">
  <v-btn color="#1B9F4E" class="w-33" @click="guardar" small>
    Guardar
  </v-btn>
</v-card-text>


            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
      <v-toolbar height="90px" dark prominent color="#8BC34A " elevation="12">
        <v-toolbar-title class="text-center color-text">Listado de Estado Usuario</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(Object.assign({}, item))">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogoEditar" max-width="500px">
        <v-card>
          <v-card-text>
            <v-form ref="formEditar" lazy-validation>
              <v-text-field v-model="paqueteEditar.estado" :counter="10" :rules="campoRules" label="Estado" required></v-text-field>
              <v-btn color="success" class="mr-8 lighten-2" @click="editarEstado()" small>Editar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Diálogo de estado agregado -->
      <v-dialog v-model="dialogoAgregarRol" max-width="500px">
        <v-card>
          <v-card-title class="headline">Estado Agregado</v-card-title>
          <v-card-text>
            ¡Estado agregado con éxito!
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" text @click="dialogoAgregarRol = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

     <!-- Diálogo de confirmación para eliminar el estado de usuario -->
<v-dialog v-model="dialogoEliminarEstadoUsuario" max-width="500px">
  <v-card class="custom-card mx-auto" style="border: 4px">
    <v-card-title class="headline text-center">Eliminar Estado de Usuario</v-card-title>
    <v-card-text class="v-card__text">¿Estás seguro de que deseas eliminar este estado de usuario?</v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" text @click="confirmarEliminarEstadoUsuario">Eliminar</v-btn>
      <v-btn color="success" text @click="dialogoEliminarEstadoUsuario = false">Cancelar</v-btn>
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
    dialogoEditar: false,
    dialogoAgregarRol: false,
    dialogoEliminarEstadoUsuario: false,
    valid: true,
    campoRules: [(v) => !!v || "Campo Requerido"],
    paquete: { estado: null },
    paqueteEditar: { id: null, estado: null },
    headers: [
      { text: "Id", value: "id" },
      { text: "Estado", value: "estado" },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    datos: []
  }),

  methods: {
    async guardar() {
      if (this.$refs.form.validate()) {
        try {
          await axios.post("http://localhost:3000/estado-usuario/crear", this.paquete);
          this.dialogoAgregarRol = true; // Mostrar el diálogo de estado agregado
          this.cargar();
        } catch (error) {
          console.error(error);
        } finally {
          this.$refs.form.reset();
        }
      }
    },
    async cargar() {
      try {
        const response = await axios.get("http://localhost:3000/estado-usuario/");
        this.datos = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editItem(item) {
      this.dialogoEditar = true;
      this.paqueteEditar = { estado: item.estado, id: item.id };
    },
    async deleteItem(id) {
      try {
        this.dialogoEliminarEstadoUsuario = true;
        this.idEstadoUsuarioAEliminar = id;
      } catch (error) {
        console.error(error);
      }
    },
    async confirmarEliminarEstadoUsuario() {
      try {
        if (this.idEstadoUsuarioAEliminar) {
          // Realiza la eliminación del estado de usuario utilizando el ID almacenado
          await axios.delete('http://localhost:3000/estado-usuario/' + this.idEstadoUsuarioAEliminar);
          
          // Vuelve a cargar los datos después de la eliminación
          this.cargar();
        }

        // Cierra el diálogo de eliminación del estado de usuario
        this.dialogoEliminarEstadoUsuario = false;
      } catch (error) {
        console.error(error);
      }
    },
    async editarEstado() {
      try {
        await axios.put('http://localhost:3000/estado-usuario/actualizar', this.paqueteEditar);
        this.dialogoEditar = false;
        this.cargar();
      } catch (error) {
        console.error(error);
        this.dialogoEditar = false;
      }
    }
  },

  mounted() {
    this.cargar();
  },
};
</script>

<style>
.crearProducto {
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)), url("../../assets/fondo2.png");
  height: 300%;
}

.ti {
  font-size: 50px;
  font-weight: 180px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serifS;
  text-align: center;
}

.image {
  max-width: 230px;
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
.custom-color-button {
  background-color: #057E28 !important;
  color: white !important;
}

.v-card__text {
  color: #333; 
}

.v-card__actions .v-btn.success {
  background-color: transparent; 
}

</style>
