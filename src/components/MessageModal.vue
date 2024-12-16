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
        <div
          class="modal-header"
          :style="{ backgroundColor: headerColor, color: headerTextColor }"
        >
          <h5 class="modal-title">{{ title }}</h5>
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
          <button type="button" class="btn btn-primary" @click="closeModal">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Mensagem",
    },
    message: {
      type: String,
      default: "",
    },
    headerColor: {
      type: String,
      default: "#28a745",
    },
    headerTextColor: {
      type: String,
      default: "#ffffff",
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
  border-radius: 10px;
}
</style>