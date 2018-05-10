<template>
    <div class="horarios">
        <div class="form-create-materia">
          <h2>Creacion de un horario</h2>
            <form @submit.prevent="createHorario">
                <label for="idAula">Aula:</label>
                <select v-model="horario.idAula">
                    <option v-for="aula in aulas" 
                        :key="aula.idAula"
                        v-bind:value="aula.idAula">
                        {{`${aula.nombre}`}}
                    </option>
                </select>
                <label for="idMateria">Materia:</label>
                <select v-model="horario.idMateria">
                    <option v-for="materia in materias" 
                        :key="materia.idMateria"
                        v-bind:value="materia.idMateria">
                        {{`${materia.nombre}`}}
                    </option>
                </select>
                <label for="dia">Dia:</label>
                <select v-model="horario.dia">
                    <option v-for="dia in diasSemana" 
                        :key="dia.idDia"
                        v-bind:value="dia.nombre">
                        {{`${dia.nombre}`}}
                    </option>
                </select>
                <label for="hora_inicio">hora inicio:</label>
                <input v-model="horario.hora_inicio" type="text" name="materia-hora-inicio" id="materia-hora-inicio" placeholder="hora inicio" required>
                <label for="hora_fin">hora fin:</label>
                <input v-model="horario.hora_fin" type="text" name="materia-hora-fin" id="materia-hora-fin" placeholder="hora fin" required>
                <button type="submit">Crear un horario para una materia</button>
            </form>
            <div v-if="isThereError" class="errors">
                <pre>{{error}}</pre>
            </div>
        </div>
        <div class="seleccion-horario">
            <h1>Selecciona una aula</h1>
            <label for="aula">Aula</label>
            <select v-model="idAulaSeleccionada">
                <option v-for="aula in aulas" 
                    :key="aula.idAula"
                    v-bind:value="aula.idAula">
                    {{`${aula.nombre}`}}
                </option>
            </select>
        </div>
        <h2>Horarios para la sala {{idAulaSeleccionada+1}}</h2>
        <div v-if="horarios.length > 0">
            <table class="table-horarios">
                <tr class="horarios-header">
                    <th class="title">#</th>
                    <th class="title">idAula</th>
                    <th class="title">idMateria</th>
                    <th class="title">dia</th>
                    <th class="title">hora_inicio</th>
                    <th class="title">hora_fin</th>
                </tr>
                <tr class="materia" v-for="(horario, index) in horarios" :key="index">
                    <td class="horario-info">{{index+1}}</td>
                    <td class="horario-info">{{horario.idAula}}</td>
                    <td class="horario-info">{{horario.idMateria}}</td>
                    <td class="horario-info">{{horario.dia}}</td>
                    <td class="horario-info">{{horario.hora_inicio}}</td>
                    <td class="horario-info">{{horario.hora_fin}}</td>
                </tr>
            </table>
        </div>
        <div v-else class="errors">
            <span>No hay horarios.</span>        
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
      horarios: [],
      materias: [],
      diasSemana: [
        {
          idDia: 1,
          nombre: "Lunes"
        },
        {
          idDia: 2,
          nombre: "Martes"
        },
        {
          idDia: 3,
          nombre: "Miercoles"
        },
        {
          idDia: 4,
          nombre: "Jueves"
        },
        {
          idDia: 5,
          nombre: "Viernes"
        }
      ],
      error: {},
      isThereError: false,
      nombreAulaSeleccionada: "Todos los horarios",
      idAulaSeleccionada: 0,
      horario: {
        idAula: 0,
        idMateria: 0,
        dia: "",
        hora_inicio: "",
        hora_fin: ""
      }
    };
  },
  mounted() {
    // GET AULAS
    this.getAulas();

    // GET MATERIAS
    this.getMaterias();

    // GET HORARIOS By IDSALA
    this.getHorariosByIdSala(this.idAulaSeleccionada);
  },
  watch: {
    idAulaSeleccionada: function(newIdAula, oldIdAula) {
      console.log("oldIdAula", oldIdAula);
      // GET HORARIOS By IDSALA
      this.getHorariosByIdSala(newIdAula);
    }
  },
  methods: {
    createHorario() {
      console.log("createHorario");

      this.horarios.push(this.horario);

      // Axios
      var instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000
      });

      // Native form submission is not yet supported
      instance
        .post("/horarios", this.horario)
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
    getAulas() {
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
          this.isThereError = false;
        })
        .catch(err => {
          // Axios
          console.error(err.response.data);
          this.error = err.response.data;
          this.isThereError = true;
        });
    },
    getMaterias() {
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
    getHorariosByIdSala(idSala) {
      // Axios
      var instance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000
      });

      let url = "/horarios/";
      if (idSala > 0) {
        url = `/horarios/${idSala}`;
      }

      // Native form submission is not yet supported
      instance
        .get(url)
        .then(horarios => {
          this.horarios = horarios.data;
        })
        .catch(err => {
          // Axios
          console.error(err.response.data);
          this.error = err.response.data;
        });
    }
  }
};
</script>

<style>
.seleccion-horario {
  text-align: center;
}
</style>
