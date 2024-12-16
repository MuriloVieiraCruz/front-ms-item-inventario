<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header" :style="{ backgroundColor: headerColor }">
        <h5 class="modal-title">{{ title }}</h5>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
        <button class="btn btn-danger" @click="$emit('confirm')">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    visible: { type: Boolean, required: true },
    title: { type: String, default: "Confirmação" },
    message: { type: String, required: true },
    headerColor: { type: String, default: "#dc3545" }, // Vermelho padrão para ações críticas
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 5px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal-header {
  padding: 10px;
  color: #fff;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.modal-body {
  padding: 20px;
  text-align: center;
}
.modal-footer {
  padding: 10px;
  display: flex;
  justify-content: space-around;
}
</style>