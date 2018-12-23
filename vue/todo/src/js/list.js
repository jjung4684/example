var  listComponent = {
  props: ['propsdata'],
    methods: {
      removeTodo(todoItem, index) {
        this.$emit('removeTodo', todoItem, index);
      }
    }

};

export { listComponent as default };
