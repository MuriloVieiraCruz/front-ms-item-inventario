<template>
  <div class="container-update">
    <h1 class="title-update">Editar Item</h1>
    <form class="form-update" @submit.prevent="updateItem">
      <label for="id">ID:</label>
      <input id="id" type="text" v-model="item.id" readonly />
      <label for="codigo">Código:</label>
      <input
        id="codigo"
        type="text"
        v-model="item.codigo"
        required
        maxlength="7"
      />
      <label for="disponibilidade">Disponibilidade:</label>
      <select id="disponibilidade" v-model="item.disponibilidade" required>
        <option value="D">Sim</option>
        <option value="I">Não</option>
      </select>
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
      />
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

    <!-- Modal de Erros -->
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
import "@/assets/styles/UpdateItem.css";
import api from "@/services/api";
import MessageModal from "@/components/MessageModal.vue";

export default {
  name: "UpdateItem",
  components: { MessageModal },
  data() {
    return {
      item: {
        id: "",
        codigo: "",
        disponibilidade: "D",
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
    fetchItem() {
      const id = this.$route.params.id;
      api.get(`/item-inventario/${id}`).then((response) => {
        this.item = response.data;
      });
    },
    updateItem() {
      api.put("/item-inventario", this.item)
        .then(() => {
          this.successMessage = "Item atualizado com sucesso!";
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
  mounted() {
    this.fetchItem();
  },
};
</script>