<template>
  <v-row justify="center" class="crearProducto">
    <v-container justify="center" max-width="100%">

      <v-card justify="center" class="card" style="background-color: rgba(255, 255, 255, 0.5);">
        <br>
        <v-row max-width="50%" class=" justify-center">
          <v-card-title style="font-size: 50px; font-family:'Times New Roman', Times, cursive">Formulario de
            Préstamo</v-card-title>
        </v-row>
        <v-card-text>
          <v-form ref="form">
            <v-row>


              <v-col cols="12" md="6">
                <v-text-field v-model="dateRangeText" :rules="nameRules" label="Fecha del Préstamo"
                  prepend-icon="mdi-calendar" readonly @click="showDatePickerDialog = true">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="horaInicio" :rules="nameRules" label="Hora de Inicio"
                  prepend-icon="mdi-clock-time-four-outline" readonly
                  @click="showHoraInicioDialog = true"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="horaFinal" :rules="nameRules" label="Hora de Entrega"
                  prepend-icon="mdi-clock-time-four-outline" readonly
                  @click="showHoraFinalDialog = true"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-col cols="12" md="9">
                  <v-select v-model="detalleprestamo.id_tipo" :items="tipo_equipo" item-text="tipo" item-value="id"
                    label="Tipo de equipo"> </v-select>
                </v-col>

              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="detalleprestamo.cantidad" type="number"
                  label="Cantidad de equipo"></v-text-field>
              </v-col>


            </v-row>
          </v-form>
        </v-card-text>

        <v-row class="d-flex justify-center">
          <v-btn height="35px" width="120px" justify="center" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
            class="mr-12 lighten-2" @click="guardar" small>
            Agregar
          </v-btn>
        </v-row>
        <br>
        <br>
        <v-dialog v-model="showHoraInicioDialog" max-width="400">
          <v-card class="modal">
            <v-card-title class="text-uppercase">Hora de inicio</v-card-title>
            <v-time-picker v-model="horaInicio" full-width color="success"></v-time-picker>
            <v-card-actions>
              <v-btn color="success" small @click="saveHoraInicio">Guardar</v-btn>
              <v-btn color="success" small @click="cancelHoraInicio">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modal de la hora de entrega -->
        <v-dialog v-model="showHoraFinalDialog" max-width="400">
          <v-card class="modal">
            <v-card-title class="text-uppercase">Hora de entrega</v-card-title>
            <v-time-picker v-model="horaFinal" full-width color="success"></v-time-picker>
            <v-card-actions>
              <v-btn color="success" small @click="saveHoraFinal">Guardar</v-btn>
              <v-btn color="success" small @click="cancelHoraFinal">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Modal del calendario -->
        <v-dialog v-model="showDatePickerDialog" max-width="400">
          <v-card class="modal2">
            <v-card-title class="text-uppercase">Fecha del Préstamo</v-card-title>
            <v-card-text>
              <v-date-picker v-model="dates" range></v-date-picker>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" small @click="saveDateRange">Guardar</v-btn>
              <v-btn color="success" small @click="cancelDateRange">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <br>
        <template>
          <!--tabla de prestamos-->
          <center>
            <v-simple-table class="tabla">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Tipo de equipo</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paquete.detalleprestamo" :key="index">
                    <td class="text-center">
                      <template v-if="editIndex !== index">
                        {{ getDescripcionTipo(item.id_tipo) }}
                      </template>
                      <template v-else>
                        <v-select v-model="editedItem.id_tipo" :items="tipo_equipo" item-text="tipo" item-value="id"
                          label="Tipo de equipo"></v-select>
                      </template>
                    </td>
                    <td class="text-center">
                      <template v-if="editIndex !== index">
                        {{ item.cantidad }}
                      </template>
                      <template v-else>
                        <v-text-field v-model="editedItem.cantidad" type="number"
                          label="Cantidad de equipo"></v-text-field>
                      </template>
                    </td>
                    <td class="text-right">
                      <v-icon small @click="editIndex !== index ? editar(index) : guardarEdicion()"> mdi-pencil
                      </v-icon>
                      <v-icon small @click="borrar(index)"> mdi-delete </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>

            </v-simple-table>
          </center>
        </template>
        <br>
        <br>

      </v-card>
      <center>
        <br>
        <v-btn height="35px" width="120px" justify="center" color=" aliceblue" style="color: #508d42 ;font-size: 18px"
          class="mr-12 lighten-2" @click="Prestar" small>
          Prestar
        </v-btn>
      </center>




      <v-dialog v-model="showDialog" max-width="400">
        <v-card>
          <v-card-title>Advertencia</v-card-title>
          <v-card-text>
            Por favor llene todos los campos.
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="showDialog = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Diálogo de confirmación para eliminar detalle de préstamo -->
      <v-dialog v-model="dialogoEliminarDetalle" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">Confirmar eliminación</v-card-title>
          <v-card-text class="text-center">
            ¿Estás seguro de que deseas eliminar este detalle de préstamo?
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="error" @click="eliminarDetalle">Eliminar</v-btn>
            <v-btn color="primary" @click="dialogoEliminarDetalle = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoConfirmacionBorrado" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">Confirmar eliminación</v-card-title>
          <v-card-text class="text-center">
            ¿Estás seguro de que deseas eliminar este detalle de préstamo?
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="success" @click="eliminarDetalleConfirmado">Eliminar</v-btn>
            <v-btn color="success" @click="dialogoConfirmacionBorrado = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoNoEquipos" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">No hay equipos disponibles</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="success" @click="dialogoNoEquipos = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoConfirmacionPrestamo" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">Confirmación de préstamo</v-card-title>
          <v-card-text class="text-center">
            Su prestamo ha sido exitoso.
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="success" @click="dialogoConfirmacionPrestamo = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoPrestamoExitoso" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">Préstamo exitoso</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="success" @click="dialogoPrestamoExitoso = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogoRegistrePrimero" max-width="500px">
        <v-card>
          <v-card-title class="headline text-center">Registre primero el préstamo</v-card-title>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="success" @click="dialogoRegistrePrimero = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

     <!-- Diálogo para fecha de préstamo menor que la fecha actual -->
<v-dialog v-model="dialogoFechaPrestamoInvalida" max-width="500px">
  <v-card>
    <v-card-title class="headline text-center">Error</v-card-title>
    <v-card-text class="text-center">
      La fecha de préstamo no puede ser menor que la fecha actual.
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" @click="dialogoFechaPrestamoInvalida = false">Aceptar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<!-- Diálogo para fecha de devolución menor que la fecha de préstamo -->
<v-dialog v-model="dialogoFechaDevolucionInvalida" max-width="500px">
  <v-card>
    <v-card-title class="headline text-center">Error</v-card-title>
    <v-card-text class="text-center">
      La fecha de devolución no puede ser menor que la fecha de préstamo.
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="success" @click="dialogoFechaDevolucionInvalida = false">Aceptar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


      
    </v-container>
  </v-row>
</template>

<script>
import axios from "axios";


export default {
  data: () => ({
    rules: [
      (value) => !!value || "Requerido.",
      (value) => (value && value.length >= 3) || "Mínimo 3 caracteres",
    ],
    tipo_equipo: null,
    valid: true,
    sheet: false,
    dates: ["", ""],
    objConfimacion: { numero: null, id: null },
    horaInicio: "",
    horaFinal: "",
    confirmacion: false,
    showDatePickerDialog: false,
    showHoraInicioDialog: false,
    showHoraFinalDialog: false,
    detalleprestamo: { id_tipo: null, cantidad: null },
    dialog: false,
    dialog2: false,
    search: "",
    showDialog: false,
    dialogoFechaPrestamoInvalida: false,
  dialogoFechaDevolucionInvalida: false,
    dialogoConfirmacionBorrado: false,
    indexBorrado: null,
    dialogoNoEquipos: false,
    dialogoFechaDevolucion: false,
    dialogoConfirmacionPrestamo: false,
    dialogoPrestamoExitoso: false,
    dialogoRegistrePrimero: false,
    editIndex: -1,
    editedItem: { id_tipo: null, cantidad: null },
    dialogoEliminarDetalle: false,
    paqueteEditar: {
      id: null,
      serial: null,
      fecha_prestamo: null,
      fecha_devolucion: null,

    },
    paquete: {
      fecha_prestamo: null,
      fecha_devolucion: null,
      cedula: null,
      id_estado: 1,
      detalleprestamo: [

      ],

    },
    nameRules: [(v) => !!v || "Campo requerido"],
    estadodB: [],
    usuarioDB: [],

    headers: [
      { text: "Id", value: "id" },
      { text: "Cedula", value: "cedula.cedula" },
      { text: "Fecha Prestamo", value: "fecha_prestamo" },
      { text: "Fecha Devolucion", value: "fecha_devolucion" },
      { text: "Estado Prestamo", value: "id_estado.estado" },

      { text: 'Actions', value: 'actions', sortable: false },


    ],
    headers2: [
      { text: "Id", value: "id" },
      { text: "Serial", value: "detalle.equipo.serial" },
      { text: 'Tipo', value: "detalle.equipo.tipo" },
      { text: "Fecha Prestamo", value: "fecha_prestamo" },
      { text: "Fecha Devolución", value: "fecha_devolucion" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    datos: [],
    datos2: [],

  }),

  watch: {
    horaInicio: {
      handler() {
        this.paquete.fecha_prestamo = this.dates[0] + " " + this.horaInicio;
      },
      deep: true,
    },
    horaFinal: {
      handler() {
        this.paquete.fecha_devolucion = this.dates[1] + " " + this.horaFinal;
      },
      deep: true,
    },
    dates: {
      handler() {
        this.paquete.fecha_prestamo = this.dates[0] + " " + this.horaInicio;
        this.paquete.fecha_devolucion = this.dates[1] + " " + this.horaFinal;
      },
      deep: true,
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ");
    },
  },

  methods: {
    guardarID(item) {
      this.datos2 = item;
      this.dialog = true;
    },
    async detalle(item) {
      var vm = this;
      await axios
        .get("http://localhost:3000/detalle-prestamo/" + item)
        .then(function (response) {
          // handle success
          vm.datos2 = response.data;
          console.log(vm.datos2);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    getDescripcionTipo(id) {
      const tipo = this.tipo_equipo.find((te) => te.id === id);
      return tipo ? tipo.tipo : "N/A";

    },
    async listartipoequipo() {
      var vm = this;
      await axios.get('http://localhost:3000/tipo-equipo')
        .then(function (response) {
          // handle success
          vm.tipo_equipo = response.data;
          console.log(vm.tipo_equipo);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          vm.$refs.form.reset();
        });
    },
    guardar() {
      if (
        this.$refs.form.validate() &&
        this.detalleprestamo.id_tipo != null &&
        this.detalleprestamo.cantidad != null
      ) {
        this.paquete.detalleprestamo.push({ ...this.detalleprestamo });
        this.detalleprestamo = { id_tipo: null, cantidad: null };
      } else {
        this.showDialog = true;
      }
    },

    borrar(index) {
      this.indexBorrado = index;
      this.dialogoConfirmacionBorrado = true;
    },
    eliminarDetalleConfirmado() {
      this.paquete.detalleprestamo.splice(this.indexBorrado, 1);
      this.indexBorrado = null;
      this.dialogoConfirmacionBorrado = false;
    },
    Prestar() {
  var vm = this;
  this.paquete.cedula = this.$store.getters.getCedula;
  const fechaActual = new Date();
  const fechaPrestamo = new Date(this.paquete.fecha_prestamo);
  const fechaDevolucion = new Date(this.paquete.fecha_devolucion);

  if (fechaPrestamo.getTime() < fechaActual.getTime()) {
    vm.dialogoFechaPrestamoInvalida = true;
    return;
  }

  if (fechaDevolucion.getTime() < fechaPrestamo.getTime()) {
    vm.dialogoFechaDevolucionInvalida = true;
    return;
  }

      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/prestamo/crear", this.paquete)
          .then((response) => {
            vm.cargar();
            console.log(response);
            if (response.data.respuesta === "No hay ningun equipo disponible") {
              vm.dialogoNoEquipos = true;
            } else {
              if (response.data.numero > 0) {
                vm.objConfimacion.numero = response.data.numero;
                vm.confirmacion = true;
              } else {
                vm.dialogoPrestamoExitoso = true;
              }
            }
          })
          .catch(function (error) {
            alert(error);
            console.log(error);
          });
      } else {
        vm.dialogoRegistrePrimero = true;
      }
    },
    eliminarDetalle() {
      var vm = this;
      axios
        .delete("http://localhost:3000/detalle-prestamo/" + vm.objConfimacion.id)
        .then(function (response) {
          console.log(response);
          alert("cancelacion exitosa");
          vm.dialogoEliminarDetalle = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },


    async listarEquipo() {
      await axios.get('localhost:3000/equipo/Estado').then(resp => {
        this.equipoDB = resp.data;
      })
    },


    async listarusuario() {
      await axios.get('http://localhost:3000/user').then(resp => {
        this.usuarioDB = resp.data;
      })
    },
    async listarestado() {
      await axios.get('http://localhost:3000/estado-prestamo').then(resp => {
        this.estadodB = resp.data;
      })
    },


    editar(index) {
      this.editIndex = index;
      this.editedItem = { ...this.paquete.detalleprestamo[index] };
    },

    cancelarEdicion() {
      this.editIndex = -1;
      this.editedItem = { id_tipo: null, cantidad: null };
    },

    guardarEdicion() {
      if (this.editedItem.id_tipo && this.editedItem.cantidad) {
        this.$set(this.paquete.detalleprestamo, this.editIndex, { ...this.editedItem });
        this.cancelarEdicion();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },
    cancelDateRange() {
      this.showDatePickerDialog = false;
    },
    async cargar() {
      var vm = this
      this.listarusuario();
      await axios
        .get("http://localhost:3000/prestamo/")
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
      alert(id);
      await axios.delete('http://localhost:3000/prestamo/' + id).then(response => {
        console.log(response.data);
        this.cargar();

      })

    }, reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    saveDateRange() {
      this.showDatePickerDialog = false;
    },
    saveHoraInicio() {
      this.showHoraInicioDialog = false;
    },
    cancelHoraInicio() {
      this.showHoraInicioDialog = false;
    },
    saveHoraFinal() {
      this.showHoraFinalDialog = false;
    },
    cancelHoraFinal() {
      this.showHoraFinalDialog = false;
    },
    formatearFecha(fecha) {
      const fechaObj = new Date(fecha);
      const opcionesFecha = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const opcionesHora = {
        hour: "2-digit",
        minute: "2-digit",
      };

      const fechaFormateada = fechaObj
        .toLocaleDateString("en-US", opcionesFecha)
        .replace(/\//g, "-"); // Reemplazar barras con guiones

      const horaFormateada = fechaObj.toLocaleTimeString("en-US", opcionesHora);

      return `${fechaFormateada} - ${horaFormateada}`;
    },
  },
  mounted() {
    this.cargar();
    this.listartipoequipo();
    this.listarusuario();
    this.listarestado();
    this.listartipoequipo();
    const rol = this.$store.getters.getRol;
    console.log(this.$store.getters.getUsuario);
    if (rol == 'Instructor') {
      this.paquete.cedula = this.$store.getters.getUsuario.cedula;
    }
    var vm = this;
    axios
      .get("http://localhost:3000/prestamo")
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
.ti {
  color: rgb(8, 4, 4);
  font-size: 36px;
  font-family: "times new roman", cursive;
  text-align: center;
  float: center;

}

.button {
  display: flex;
  justify-content: center;
}

.container {
  max-width: 85% !important;
}

.crearProducto {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(226, 215, 215, 0.5)),
    url("../../assets/fondo2.png");
  width: 110%;
  height: 300%;

}
</style>