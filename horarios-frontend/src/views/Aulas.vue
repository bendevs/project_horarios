<template>
    <div class="aulas">
      <div class="form-create-aula">
            <h2>Creacion de una aula</h2>
          <form @submit.prevent="createAula">
              <label for="nombre">Nombre:</label>
              <input v-model="aula.nombre" type="text" name="aula-nombre" id="aula-nombre" placeholder="nombre aula" required>
              <button type="submit">Crear una Aula</button>
          </form>
          <div v-if="isThereError" class="errors">
              <pre>{{error}}</pre>
          </div>
      </div>
       <div v-if="aulas.length > 0">
        <table class="table-aulas">
            <tr class="aulas-header">
                <th class="title">#</th>
                <th class="title">nombre</th>
            </tr>
            <tr class="aula" v-for="(aula, index) in aulas" :key="aula.idAula">
                <td class="aula-info">{{index+1}}</td>
                <td class="aula-info">{{aula.nombre}}</td>
            </tr>
        </table>
       </div>
       <div v-else>
        <span>No hay aulas.</span>        
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "aulas",
  data() {
    return {
      aulas: [],
      error: {},
      isThereError: false,
      aula: {
        nombre: ""
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
      .get("/aulas")
      .then(aulas => {
        this.aulas = aulas.data;
      })
      .catch(err => {
        // Axios
        console.error(err.response.data);
        this.error = err.response.data;
      });
  },
  methods: {
    createAula() {
      console.log("createAula");

      this.aulas.push(this.aula);

      // Axios
      var instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000
      });

      // Native form submission is not yet supported
      instance
        .post("/aulas", this.aula)
        .then(() => {
          this.isThereError = false;
        })
        .catch(err => {
          // Axios
          console.error(err.response.data);
          this.error = err.response.data;
          this.isThereError = true;
        });
    }
  }
};
</script>
