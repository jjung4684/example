import TodoHeader from '../components/include/TodoHeader.vue'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFooter from '../components/include/TodoFooter.vue'

export default {
   data() {
      return {
        todoItems: []
      }
    },
    methods: {
      clearAll() {
        localStorage.clear();
        this.todoItems = [];
      },
  		addTodo(todoItem) {
  			localStorage.setItem(todoItem, todoItem);
  			this.todoItems.push(todoItem);
  		},
      removeTodo(todoItem, index) {
        localStorage.removeItem(todoItem);
        this.todoItems.splice(index, 1);
      }
    },
    created() {
  		if (localStorage.length > 0) {
  			for (var i = 0; i < localStorage.length; i++) {
  				this.todoItems.push(localStorage.key(i));
  			}
  		}
    },
    components: {
      'TodoHeader': TodoHeader,
      'TodoInput': TodoInput,
      'TodoList': TodoList,
      'TodoFooter': TodoFooter
    }

}
