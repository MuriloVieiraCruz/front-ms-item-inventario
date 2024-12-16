<template>
  <div class="container-create">
    <h1 class="title-create">Criar Item</h1>
    <form class="form-create" @submit.prevent="createItem">
      <label for="codigo">Código:</label>
      <input
        id="codigo"
        type="text"
        v-model="item.codigo"
        required
        maxlength="7"
      />
      <label for="descricao">Descrição:</label>
      <input
        id="descricao"
        type="text"
        v-model="item.descricao"
        required
        maxlength="100"
      />
      <label for="localizacao">Localização:</label>
      <textarea
        id="localizacao"
        type="text"
        v-model="item.localizacao"
        required
        rows="4"
        maxlength="250"
        class="textarea-localizacao"
      ></textarea>
      <button type="submit">Salvar</button>
    </form>

    <MessageModal
      v-if="showSuccessModal"
      :visible="showSuccessModal"
      title="Sucesso"
      :message="successMessage"
      :headerColor="'#28a745'"
      @close="handleSuccessModalClose"
    />

    <MessageModal
      v-if="showErrorModal"
      :visible="showErrorModal"
      title="Erro"
      :message="errorMessage"
      :headerColor="'#dc3545'"
      @close="showErrorModal = false"
    />
  </div>
</template>

<script>
import "@/assets/styles/CreateItem.css";
import MessageModal from "@/components/MessageModal.vue";
import api from "@/services/api";

export default {
  name: "CreateItem",
  components: { MessageModal },
  data() {
    return {
      item: {
        codigo: "",
        descricao: "",
        localizacao: "",
      },
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    createItem() {
      api
        .post("/", this.item)
        .then(() => {
          this.successMessage = "Item criado com sucesso!";
          this.showSuccessModal = true;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) {
              const erros = error.response.data?.erros || [];
              if (erros.length > 0) {
                const mensagemErro = erros
                  .map((erro) => `Código: ${erro.codigo} - ${erro.mensagem}`)
                  .join("\n");
                this.errorMessage = `Erro(s):\n${mensagemErro}`;
              } else {
                this.errorMessage = "Erro ao atualizar o item! Detalhes não fornecidos pelo servidor."
              }
            } else {
              this.errorMessage = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
            }
          } else {
            this.errorMessage = "Erro de conexão. Verifique sua internet ou tente novamente mais tarde."
          }
          this.showErrorModal = true;
        });
    },
    handleSuccessModalClose() {
      this.showSuccessModal = false;
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>