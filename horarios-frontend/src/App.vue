<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/docentes">docentes | </router-link>
      <router-link to="/materias">materias | </router-link>
      <router-link to="/aulas">aulas |</router-link>
      <router-link to="/horarios">horarios</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.errors {
  background-color: red;
  border-radius: 10px;
  color: white;
  margin: 10px;
  padding: 10px;
  text-align: left;
}

form {
  text-align: left;
}

input {
  display: block;
}

label {
  display: block;
}

table {
  display: block;
  margin: 0 auto;
}
</style>
