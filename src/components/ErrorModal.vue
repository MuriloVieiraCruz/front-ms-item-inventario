<template>
  <div
    v-if="visible"
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Erro</h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeModal"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    message: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #fff;
}
.modal-header {
  background-color: #dc3545;
  color: white;
}
</style>