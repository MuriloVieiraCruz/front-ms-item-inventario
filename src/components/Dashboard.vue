<template>
  <div class="container container-custom">
    <h1 class="title-custom">Inventário</h1>

    <button class="btn btn-create mb-3" @click="goToCreate">
      Novo Item
    </button>

    <div class="filter-buttons">
      <label for="filterCodigo" class="form-label me-2">Filtrar por ID:</label>
      <input
        id="filterCodigo"
        type="text"
        class="form-control form-control-sm me-2"
        v-model="filterCodigo"
        placeholder="Digite o código do produto"
      />
      <button
        class="btn-filter"
        @click="applyFilter"
      >
        Filtrar
      </button>
      <button
        class="btn-clear"
        @click="clearFilter"
      >
        Limpar
      </button>
    </div>

    <table class="table table-bordered table-hover table-striped table-custom">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Número de Série</th>
          <th>Disponibilidade</th>
          <th>Descrição</th>
          <th>Localização</th>
          <th>Data de Movimentação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.codigo }}</td>
          <td>{{ item.numeroSerie }}</td>
          <td>{{ item.disponibilidade }}</td>
          <td>{{ item.descricao }}</td>
          <td>{{ item.localizacao }}</td>
          <td>{{ item.dataMovimentacao }}</td>
          <td>
            <button
              class="btn btn-primary btn-sm btn-custom"
              @click="goToUpdate(item.id)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm btn-custom"
              @click="openDeleteModal(item.id)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div>
        <label for="pageSize" class="form-label">Itens por página:</label>
        <select
          id="pageSize"
          class="form-control form-control-sm"
          v-model="pagination.size"
          @change="fetchItems"
        >
          <option v-for="size in [5, 10, 20, 50]" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
      <div>
        <button
          class="btn btn-secondary btn-sm"
          :disabled="pagination.page === 0"
          @click="changePage(pagination.page - 1)"
        >
          Anterior
        </button>
        <button
          class="btn btn-secondary btn-sm"
          :disabled="pagination.page >= totalPages - 1"
          @click="changePage(pagination.page + 1)"
        >
          Próximo
        </button>
        <span>
          Página {{ pagination.page + 1 }} de {{ totalPages }}
        </span>
      </div>
    </div>

    <ConfirmationModal
      v-if="showConfirmModal"
      :visible="showConfirmModal"
      title="Excluir Item"
      :message="'Tem certeza que deseja excluir o item ID ' + selectedItemId + '?'"
      @confirm="deleteItem"
      @cancel="showConfirmModal = false"
    />

    <MessageModal
      v-if="showSuccessModal"
      :visible="showSuccessModal"
      title="Sucesso"
      :message="successMessage"
      :headerColor="'#28a745'"
      @close="showSuccessModal = false"
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
import "@/assets/styles/DashboardInventario.css";
import MessageModal from "@/components/MessageModal.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import api from "@/services/api";

export default {
  name: "DashboardInventario",
  components: { MessageModal, ConfirmationModal },
  data() {
    return {
      items: [],
      pagination: {
        page: 0,
        size: 10,
      },
      totalPages: 1,
      filterCodigo: "",
      showConfirmModal: false,
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      selectedItemId: null,
    };
  },
  methods: {
    fetchItems() {
  if (this.filterCodigo.trim() !== "") {
    api
      .get(`/${this.filterCodigo}`)
      .then((response) => {
        this.items = [response.data];
        this.totalPages = 1;
      })
      .catch(() => {
        this.items = [];
        this.totalPages = 0;
        alert("Nenhum item encontrado ou erro ao buscar o item.");
      });
  } else {
    api
      .get("/listAll", {
        params: {
          page: this.pagination.page,
          size: this.pagination.size,
        },
      })
      .then((response) => {
        this.items = response.data.content;
        this.totalPages = response.data.totalPages;
      })
      .catch(() => {
        alert("Erro ao carregar os itens do inventário.");
      });
  }
},
    changePage(newPage) {
      this.pagination.page = newPage;
      this.fetchItems();
    },
    applyFilter() {
      this.pagination.page = 0;
      this.fetchItems();
    },
    clearFilter() {
      this.filterCodigo = "";
      this.pagination.page = 0;
      this.fetchItems();
    },
    goToCreate() {
      this.$router.push({ name: "Create" });
    },
    goToUpdate(id) {
      this.$router.push({ name: "Update", params: { id } });
    },
    openDeleteModal(id) {
      this.selectedItemId = id;
      this.showConfirmModal = true;
    },
    deleteItem() {
      api
        .delete(`/${this.selectedItemId}`)
        .then(() => {
          this.successMessage = "Item excluído com sucesso!";
          this.showSuccessModal = true;
          this.fetchItems();
        })
        .catch(() => {
          this.errorMessage = "Erro ao excluir o item!";
          this.showErrorModal = true;
        })
        .finally(() => {
          this.showConfirmModal = false;
        });
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>