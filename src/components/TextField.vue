<template>
  <div class="field">
    <label :for="formControl.id" class="label has-text-left">{{ formControl.label }}</label>
    <div class="control">
      <input
        :id="formControl.id"
        class="input"
        type="text"
        v-model="formControl.value"
        :placeholder="formControl.placeholder"
        :readonly="formControl.readonly"
        :class="vClass()"
        @blur="touched"
        @input="dirty"
      />
    </div>
    <small v-if="isErrorState()" class="help is-danger has-text-left">{{formControl.errors[0]}}</small>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { FormControl } from '@/models/FormControl';

@Component({})
export default class TextField extends Vue {
  private static _id = 1;

  @Prop() private formControl!: FormControl;

  mounted() {

    console.log('OI');
    console.log(this.formControl);
    if (!this.formControl) {
      throw new Error('A FormControl instance is required');
    }else if (!this.formControl.id) {
      this.formControl.id = `input-text-${TextField._id}`;
      TextField._id += 1;
    }
    console.log(this.formControl);

  }

  touched(){
    this.formControl.touched = true
  }

  dirty(){
    this.formControl.dirty = true
  }


  isErrorState(){
    return !this.formControl.valid && this.formControl.touched;
  }

  vClass() {
    return { 'is-danger': this.isErrorState()};
  }
}
</script>

<style lang="scss" scoped>
* {
  --ml: calc(0.75em - 1px);
}
label {
  margin-left: var(--ml);
}
small {
  margin-left: var(--ml);
}
</style>
