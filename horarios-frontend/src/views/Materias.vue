<template>
    <div class="materias">
        <div class="form-create-materia">
            <h2>Creacion de una materia</h2>
            <form @submit.prevent="createMateria">
                <label for="idDocente">Docente</label>
                <select v-model="materia.idDocente">
                  <option v-for="docente in docentes" 
                          :key="docente.idDocente"
                          v-bind:value="docente.idDocente">
                          {{`${docente.nombre} ${docente.paterno} ${docente.materno}`}}
                  </option>
                </select>
                <label for="nombre">Nombre:</label>
                <input v-model="materia.nombre" type="text" name="materia-nombre" id="materia-nombre" placeholder="nombre materia" required>
                <button type="submit">Crear una materia</button>
            </form>
            <div v-if="isThereError" class="errors">
                <pre>{{error}}</pre>
            </div>
        </div>
        <div v-if="materias.length > 0">
          <table class="table-materias">
              <tr class="materias-header">
                  <th class="title">#</th>
                  <th class="title">idDocente</th>
                  <th class="title">nombre</th>
              </tr>
              <tr class="materia" v-for="(materia, index) in materias" :key="materia.idMateria">
                  <td class="materia-info">{{index+1}}</td>
                  <td class="materia-info">{{materia.idDocente}}</td>
                  <td class="materia-info">{{materia.nombre}}</td>
              </tr>
          </table>
        </div>
        <div v-else>
        <span>No hay materias.</span>        
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "materias",
  data() {
    return {
      materias: [],
      docentes: [],
      error: {},
      isThereError: false,
      materia: {
        idDocente: 0,
        nombre: ""
      }
    };
  },
  mounted() {
    // GET los docentes
    this.getDocentes();

    // Axios
    var instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 1000
    });

    // Native form submission is not yet supported
    instance
      .get("/materias")
      .then(materias => {
        this.materias = materias.data;
      })
      .catch(err => {
        // Axios
        console.error(err.response.data);
        this.error = err.response.data;
      });
  },
  methods: {
    createMateria() {
      console.log("createMateria");
      this.materias.push(this.materia);

      // Axios
      var instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000
      });

      // Native form submission is not yet supported
      instance
        .post("/materias", this.materia)
        .then(() => {
          this.isThereError = false;
        })
        .catch(err => {
          // Axios
          console.error(err.response.data);
          this.error = err.response.data;
          this.isThereError = true;
        });
    },
    getDocentes() {
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
