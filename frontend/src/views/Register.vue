<template>
  <div class="list">
    <v-app-bar flat class="bar blue lighten-4" height="56">
      <h1 class="headline">Consulta de alunos</h1>
    </v-app-bar>

    <v-form ref="form">
      <v-layout class="mx-5 mt-16" row>
        <v-flex md3 height="56" class="blue lighten-4 labelInput">
          <h3>
            Nome
          </h3>
        </v-flex>
        <v-flex md9>
          <v-text-field
            outlined
            label="Nome"
            placeholder="Informe o nome completo"
            v-model="name"
            single-line
            hide-details
            :rules="nameRules"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout class="mx-5 mt-9" row>
        <v-flex md3 height="56" class="blue lighten-4 labelInput">
          <h3>
            Email
          </h3>
        </v-flex>
        <v-flex md9>
          <v-text-field
            outlined
            placeholder="Informe apenas um email"
            v-model="email"
            single-line
            hide-details
            :rules="emailRules"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout class="mx-5 mt-9" row>
        <v-flex md3 height="56" class="blue lighten-4 labelInput">
          <h3>
            RA
          </h3>
        </v-flex>
        <v-flex md9>
          <v-text-field
            :disabled="desabled"
            outlined
            placeholder="Informe o registro acadêmico"
            v-model="ra"
            single-line
            hide-details
            :rules="raRules"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout class="mx-5 mt-9" row>
        <v-flex md3 height="56" class="blue lighten-4 labelInput">
          <h3>
            CPF
          </h3>
        </v-flex>
        <v-flex md9>
          <v-text-field
            :disabled="desabled"
            outlined
            placeholder="Informe o número do documento no formato ###.###.###-##"
            v-model="cpf"
            single-line
            hide-details
            :rules="cpfRules"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row class="mx-5 mt-13">
        <v-flex md8></v-flex>
        <v-flex md2>
          <v-btn
            @click="returnWithEmptyStorage()"
            dark
            text
            height="56"
            class="error ml-11 mt-3"
            >Cancelar</v-btn
          >
        </v-flex>
        <v-flex md2>
          <v-btn @click="register()" text height="56" class="success ml-13 mt-3"
            >Salvar</v-btn
          >
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/services/api";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      nameRules: [
        v =>
          (v && v.length >= 10) || "Nome precisa ter pelo menos 10 caracteres"
      ],
      email: "",
      emailRules: [v => /.+@.+\..+/.test(v) || "Email não válido"],
      ra: "",
      raRules: [v => /^\d{6}$/.test(v) || "RA não válido"],
      cpf: "",
      cpfRules: [
        v =>
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) ||
          "CPF precisa estar no formato correto"
      ],
      edit: false,
      student_id: "",
      desabled: false
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        if (!this.edit) {
          try {
            await api.post("students", {
              name: this.name,
              email: this.email,
              ra: this.ra,
              cpf: this.cpf
            });

            localStorage.removeItem("@vuetifyChalange:StudentToBeChanged");
            this.$emit("studentRegistered");
            this.$refs.form.reset();
            this.$router.push("/register");
          } catch (err) {
            this.$emit("studentRegisteredError");
          }
        } else {
          try {
            await api.put("students", {
              student_id: this.student_id,
              name: this.name,
              email: this.email
            });
            (this.name = ""),
              (this.email = ""),
              (this.ra = ""),
              (this.cpf = "");
            localStorage.removeItem("@vuetifyChalange:StudentToBeChanged");
            this.$emit("studentAltered");
            this.$router.push("/");
          } catch (err) {
            this.$emit("studentAlteredError");
          }
        }
      }
    },
    returnWithEmptyStorage() {
      localStorage.removeItem("@vuetifyChalange:StudentToBeChanged");

      this.$router.push("/");
    }
  },
  created() {
    const student = localStorage.getItem("@vuetifyChalange:StudentToBeChanged");

    if (student) {
      const studentParsed = JSON.parse(student);

      this.name = studentParsed.name;
      this.ra = studentParsed.ra;
      this.email = studentParsed.email;
      this.cpf = studentParsed.cpf;
      this.student_id = studentParsed.id;

      this.edit = true;
      this.desabled = true;
    }
  }
};
</script>
<style>
.bar {
  display: flex;
  justify-content: center;
}
.labelInput {
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
  border-radius: 6px 0 0 6px;
}
</style>
