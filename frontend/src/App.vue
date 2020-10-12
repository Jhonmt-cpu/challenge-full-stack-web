<template>
  <v-app style="background:#f5f5f5">
    <v-snackbar
      class="snack"
      v-model="snackbar"
      :timeout="4000"
      bottom
      :color="snackbarColor"
    >
      <v-layout row>
        <v-flex align-self-center class="pl-1 text-center">
          <span>{{ snackbarMessage }}</span>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout>
      <v-flex md3>
        <Navbar />
      </v-flex>
      <v-flex md9 style="border-left:1px solid black">
        <v-main>
          <router-view
            @studentRegistered="
              (snackbar = true),
                (snackbarMessage = 'Aluno cadastrado com sucesso!'),
                (snackbarColor = 'success')
            "
            @studentAltered="
              (snackbar = true),
                (snackbarMessage = 'Aluno alterado com sucesso!'),
                (snackbarColor = 'success')
            "
            @studentRegisteredError="
              (snackbar = true),
                (snackbarMessage =
                  'Erro ao alterar aluno, chegue as credenciais!'),
                (snackbarColor = 'error')
            "
            @studentAlteredError="
              (snackbar = true),
                (snackbarMessage =
                  'Erro ao alterar aluno, chegue as credenciais!'),
                (snackbarColor = 'error')
            "
            @studentDeleted="
              (snackbar = true),
                (snackbarMessage = 'Aluno deletado com sucesso!'),
                (snackbarColor = 'success')
            "
            @studentDeletedError="
              (snackbar = true),
                (snackbarMessage = 'Erro ao deletar aluno, tente mais tarde'),
                (snackbarColor = 'error')
            "
          />
        </v-main>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },

  data: () => ({
    snackbar: false,
    snackbarMessage: "Teste",
    snackbarColor: "success"
  })
};
</script>
