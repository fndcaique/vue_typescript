<template>
  <form @submit.prevent>
    <TextField :formControl="todoFormControl" />

    <div>
      <button class="button is-primary" @click="onSubmit">Add Todo</button>
    </div>
    {{ todoFormControl && todoFormControl.value }}
  </form>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import TextField from '@/components/TextField.vue';
import { BaseForm } from '../helpers/base-form';
import { FormControl } from '../models/FormControl';

@Component({
  components: {
    TextField,
  },
})
export default class TodoForm extends Vue implements BaseForm {
  todoFormControl: FormControl;

  constructor(){
    super();
    this.todoFormControl = new FormControl(
      {
        label:'Todo',
      },
      [
        (formControl: FormControl) => {
          const error = !formControl.value

          console.log('Validando required');


          return {
            error,
            message: error? `${formControl.label} is required` : ''
          }
        },
      ]);

  }

  onSubmit() {
    if (this.isValid()) {
      this.submit();
    }
  }

  isValid(): boolean {
    return this.todoFormControl.valid;
  }

  reset(): void {
    this.todoFormControl.reset();
  }

  @Emit('submit')
  submit() {
    // form.value;
    return this.todoFormControl.value;
  }
}
</script>

<style></style>
