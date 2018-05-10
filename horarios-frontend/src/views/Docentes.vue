<template>
  <div class="docentes">
      <div class="form-create-docente">
        <h2>Creacion de un docente</h2>
          <form @submit.prevent="createDocente">
              <label for="nombre">Nombre:</label>
              <input v-model="docente.nombre" type="text" name="docente-nombre" id="docente-nombre" placeholder="nombre docente" required>
              <label for="nombre">Paterno:</label>
              <input v-model="docente.paterno" type="text" name="docente-paterno" id="docente-paterno" placeholder="paterno docente" required>
              <label for="nombre">Materno:</label>
              <input v-model="docente.materno" type="text" name="docente-materno" id="docente-materno" placeholder="materno docente" required>
              <button type="submit">Crear un docente</button>
          </form>
          <div v-if="isThereError" class="errors">
              <pre>{{error}}</pre>
          </div>
      </div>
      <div v-if="docentes.length > 0">
        <table class="table-docentes">
          <tr class="docentes-header">
              <th class="title">#</th>
              <th class="title">nombre</th>
              <th class="title">paterno</th>
              <th class="title">materno</th>
          </tr>
          <tr class="docente" v-for="(docente, index) in docentes" :key="docente.idDocente">
            <td class="docente-info">{{index + 1}}</td>
            <td class="docente-info">{{docente.nombre}}</td>
            <td class="docente-info">{{docente.paterno}}</td>
            <td class="docente-info">{{docente.materno}}</td>
          </tr>
      </table>
      </div>
         <div v-else>
        <span>No hay docentes.</span>        
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "docentes",
  data() {
    return {
      docentes: [],
      error: {},
      isThereError: false,
      docente: {
        nombre: "",
        paterno: "",
        materno: ""
      }
    };
  },
  mounted() {
    // Axios
    var instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 1000
    });

    // Native form submission is not yet supported
    instance
      .get("/docentes")
      .then(docentes => {
        this.docentes = docentes.data;
      })
      .catch(err => {
        // Axios
        console.error(err.response.data);
        this.error = err.response.data;
      });
  },
  methods: {
    createDocente() {
      console.log("createDocente");

      this.docentes.push(this.docente);

      // Axios
      var instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000
      });

      // Native form submission is not yet supported
      instance
        .post("/docentes", this.docente)
        .then(() => {
          this.isThereError = false;
        })
        .catch(err => {
          // Axios
          console.error(err.response.data);
          this.isThereError = true;
          this.error = err.response.data;
        });
    }
  }
};
</script>
