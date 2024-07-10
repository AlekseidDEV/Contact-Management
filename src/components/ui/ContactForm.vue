<script setup lang="ts">
import {defineEmits, onMounted, reactive} from 'vue';
import {FormField} from '@/models/interface/formField';
import {useItemContact} from "@/store/storeItem";
import {ItemContact} from "@/models/interface/itemContact";
import { defineProps } from 'vue';

const props = defineProps<{
  isEdit: boolean,
  indexEdit: number
}>()

const emit = defineEmits<{
  (e: 'closeForm'): void
}>()

const store = useItemContact()
const item = store.getItemsContact[props.indexEdit]

const formFields: FormField = reactive({
  name: '',
  phone: '',
  email: '',
  errors: {}
})

let newContact: {[key: string]: string} = {}

onMounted(() => {
  if(props.isEdit){
    formFields.name = item.name
    formFields.phone = item.phone
    formFields.email = item.email
  }
})

const isValidForm = () => {
  formFields.errors = {}

  const regExpEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
  const regExpPhone = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/

  if (!formFields.name) formFields.errors.name = 'Name is required'

  if (!formFields.phone) {
    formFields.errors.phone = 'Phone is required'
  } else if (!regExpPhone.test(formFields.phone)) {
    formFields.errors.phone = 'Phone is not valid'
  }

  if (!formFields.email) {
    formFields.errors.email = 'Email is required'
  } else if (!regExpEmail.test(formFields.email)) {
    formFields.errors.email = 'Email is not valid'
  }

  return Object.keys(formFields.errors).length === 0
}

const addContact = () => {
  if (!isValidForm()) return
  for (const key of Object.keys(formFields)) {
    if (key !== 'errors') {
      newContact[key] = formFields[key] as string
    }
  }

  if(!props.isEdit){
    store.addItems(newContact as ItemContact)
  }else {
    store.editItems(props.indexEdit, newContact as ItemContact)
  }

  emit('closeForm')
}

</script>

<template>
  <div class="form-wrapper">
    <form class="flex flex-col justify-center items-center p-5">
      <div class="flex w-full flex-col gap-5 items-center">
        <div>
          <input
              v-model.trim="formFields.name"
              class="pl-5 rounded-3xl"
              type="text"
              placeholder="name">
          <p class="text-center" v-if="formFields.errors?.name">{{ formFields.errors.name }}</p>
        </div>
        <div>
          <input
              v-model.trim="formFields.phone"
              class="pl-5 rounded-3xl"
              type="tel"
              placeholder="phone">
          <p class="text-center" v-if="formFields.errors?.phone">{{ formFields.errors.phone }}</p>
        </div>
        <div>
          <input
              v-model.trim="formFields.email"
              class="pl-5 rounded-3xl"
              type="text"
              placeholder="email">
          <p class="text-center" v-if="formFields.errors?.email">{{ formFields.errors.email }}</p>
        </div>
      </div>

      <button class="py-1 px-1 mt-10 font-bold rounded-3xl text-white" @click.prevent="addContact">save</button>
      <span class="close" @click="emit('closeForm')">X</span>
    </form>
  </div>
</template>

<style scoped>
input {
  background-color: rgb(243 244 246);
}

.form-wrapper {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.33);
  position: fixed;
  top: 0;
}

form {
  max-width: 600px;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #c6c2c2;
  border-radius: 10px;
}

button {
  max-width: 100px;
  width: 100%;
  background-color: rgb(22 163 74);
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>