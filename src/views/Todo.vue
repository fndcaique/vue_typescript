<template>
  <div>
    <TodoList />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import TodoList from '@/components/TodoList.vue';

@Component({
  components: {
    TodoList,
  },
})
export default class Todo extends Vue {
  mounted() {
    console.log('Todo mounted...');
  }

  destroy() {
    console.log('Todo destroyed...');
  }
}
</script>

<style></style>
