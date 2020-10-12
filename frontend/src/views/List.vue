<template>
  <div class="list">
    <v-app-bar flat class="bar blue lighten-4" height="56">
      <h1 class="headline">Consulta de alunos</h1>
    </v-app-bar>

    <v-layout row class="mx-4 mt-4 mb-9">
      <v-flex md6>
        <v-text-field
          outlined
          placeholder="Digite sua busca"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex md2>
        <v-btn @click="find()" depressed height="56" color="blue lighten-3">
          Pesquisar
        </v-btn>
      </v-flex>
      <v-flex md4>
        <v-btn router to="/register" dark depressed height="56" color="primary">
          Cadastrar aluno
        </v-btn>
      </v-flex>
    </v-layout>

    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th>
              <div class="centerTable">
                <v-btn text color="primary" @click="sortBy('ra')">
                  <span>Registro acadêmico</span>
                  <v-icon>arrow_drop_down</v-icon>
                </v-btn>
              </div>
            </th>
            <th>
              <div>
                <v-btn text color="primary" @click="sortBy('name')">
                  <span>Nome</span>
                  <v-icon>arrow_drop_down</v-icon>
                </v-btn>
              </div>
            </th>
            <th>
              <div>
                <v-btn text color="primary" @click="sortBy('cpf')">
                  <span>CPF</span>
                  <v-icon>arrow_drop_down</v-icon>
                </v-btn>
              </div>
            </th>

            <th class="centerTable">
              <span class="primary--text body-2 font-weight-bold">AÇÕES</span>
            </th>
          </tr>
        </thead>
        <tbody :search="search">
          <tr v-for="student in students" :key="student.id">
            <td class="centerTable">
              {{ student.ra }}
            </td>
            <td>
              {{ student.name }}
            </td>

            <td>
              {{ student.cpf }}
            </td>
            <td>
              <v-layout row>
                <v-flex>
                  <v-btn
                    @click="storageStudent(student.id)"
                    class="mr-n4"
                    color="warning"
                    text
                    small
                    >Editar</v-btn
                  >
                </v-flex>
                <v-flex>
                  <v-btn
                    class="mr-n5"
                    color="error"
                    text
                    small
                    @click="defineId(student.id), (dialog = true)"
                    >Excluir</v-btn
                  >
                </v-flex>
              </v-layout>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog max-width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <h2>Excluir Aluno</h2>
        </v-card-title>
        <v-card-text>
          <v-layout row class="mt-4 ml-1">
            <span>Você deseja realmente excluir esse aluno(a)?</span>
          </v-layout>

          <v-layout row>
            <v-flex md2>
              <v-btn
                text
                class="warning mt-7"
                @click="(dialog = false), (idToBeDeleted = '')"
                >Cancelar</v-btn
              >
            </v-flex>
            <v-flex md8></v-flex>
            <v-flex md2>
              <v-btn text class="error mt-7" @click="deleteStudent()"
                >Deletar</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/services/api";

export default {
  name: "List",
  data() {
    return {
      idToBeDeleted: "",
      search: "",
      students: [],
      dialog: false
    };
  },
  methods: {
    sortBy(prop) {
      this.students.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    find() {
      if (this.search) {
        api
          .get(`/students/find?value=${this.search}`)
          .then(response => (this.students = response.data));
      } else {
        api.get("/students").then(response => (this.students = response.data));
      }
    },
    defineId(id) {
      this.idToBeDeleted = id;
    },
    async deleteStudent() {
      try {
        await api.delete(`students/${this.idToBeDeleted}`);
        api.get("/students").then(response => (this.students = response.data));
        this.dialog = false;
        this.$emit("studentDeleted");
      } catch (err) {
        this.$emit("studentDeletedError");
      }
    },
    storageStudent(id) {
      const student = this.students.find(s => s.id === id);

      localStorage.setItem(
        "@vuetifyChalange:StudentToBeChanged",
        JSON.stringify(student)
      );

      this.$router.push("/register");
    }
  },
  created() {
    try {
      api.get("/students").then(response => (this.students = response.data));
    } catch (err) {
      console.log("Erro");
    }
  }
};
</script>
<style>
.bar {
  display: flex;
  justify-content: center;
}

.centerTable {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
