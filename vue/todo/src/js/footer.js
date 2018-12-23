var  footerComponent = {
  methods :{
     clearTodo() {
          this.$emit('removeAll');
        }
  }

};

export { footerComponent as default };
