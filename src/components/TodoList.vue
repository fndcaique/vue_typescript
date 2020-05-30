<template>
  <div>
    <TodoForm @add="add($event)" />
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>TODO</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody v-if="todos.length > 0">
        <tr v-for="(todo, index) in todos" :key="index">
          <td>{{index+1}}</td>
          <td>{{todo}}</td>
          <td>
            <button class="button is-danger" @click="remove(todo)">Deletar Todo</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3" class="has-text-centered has-text-grey">Não há todos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import TodoForm from './TodoForm.vue';
@Component({
  components: {
    TodoForm,
  },
})
export default class TodoList extends Vue {
  todos = [];

  add(todo) {
    this.todos.push(todo);
  }

  remove(index) {
    this.todos.splice(index, 1);
  }

  removeAll() {
    this.todos = [];
  }
}
</script>

<style scoped lang="scss">
</style>
