import activeModal from './active.vue'
activeModal.install = function (Vue) {
  Vue.component(activeModal.name, activeModal)
}
export default activeModal
