<script setup lang="ts">
import ContactList from "@/components/ContactList.vue";

import {axiosClient} from "@/axiosClient";
import {onMounted} from "vue";

const getUser = async () => {
  const response = await axiosClient.get('/?results=10')

  console.log(response.data.results)
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <ContactList/>
</template>

<style scoped>

</style>