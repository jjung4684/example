
import Modal from '../components/common/Modal.vue'

var  inputComponent = {
    data() {
      return {
        newTodoItem: '',
        showModal: false
      }
    },
    methods: {
      addTodo() {
        if (this.newTodoItem !== "") {
          var value = this.newTodoItem && this.newTodoItem.trim();
  				this.$emit('addTodo', value)
          this.clearInput();
        } else {
          this.showModal = !this.showModal;
        }
      },
      clearInput() {
        this.newTodoItem = '';
      }
    },
    components: {
      Modal: Modal
    }

};

export { inputComponent as default };


