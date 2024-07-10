<script setup lang="ts">
import {ref} from "vue";
import {useItemContact} from "@/store/storeItem";
import { defineEmits } from "vue";

const emit = defineEmits<{
  (e: 'searched'): void
}>()

const store = useItemContact()
const searchWords = ref('')

const searchContact = () => {
  if(searchWords.value === '') return

  store.searchItem(searchWords.value)
  emit('searched')
  searchWords.value = ''
}

</script>

<template>
  <input v-model="searchWords" @keyup.enter="searchContact" class="bg-gray-100 max-w-[500px] w-full pl-5 rounded-3xl" placeholder="search contact">
</template>

<style scoped>

</style>