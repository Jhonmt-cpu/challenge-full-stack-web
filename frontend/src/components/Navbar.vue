<template>
  <nav>
    <v-layout column align-center class="primary">
      <v-flex>
        <h1 class="white--text my-3 title">Módulo acadêmico</h1>
      </v-flex>
    </v-layout>
    <v-layout column align-start class="blue lighten-4">
      <v-flex>
        <router-link router to="/" width="auto">
          <h2 class="title blue lighten-4 my-4 ml-4">
            Alunos
          </h2>
        </router-link>
      </v-flex>
    </v-layout>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: true
    };
  }
};
</script>
<style>
* {
  text-decoration: none;
}
</style>
