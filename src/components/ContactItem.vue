<script setup lang="ts">
import {useRoute} from "vue-router";
import {useItemContact} from "@/store/storeItem";
import ContactForm from "@/components/ContactForm.vue";
import {ref} from "vue";

const store = useItemContact()
const route = useRoute()

const isShowForm = ref(false)
const isItem = ref(true)

let itemDetail = store.getItemsContact[+route.params.id]

</script>

<template>
  <div class="container flex flex-col items-center">
    <div
        class="item mt-20 cursor-pointer py-10 px-10 bg-gray-200 w-full rounded-3xl"
        v-if="isItem"
    >
      <div class="item-info flex gap-5">
        <div><span>Name: </span><span>{{ itemDetail.name }}</span></div>
        <div><span>Phone: </span><span>{{ itemDetail.phone }}</span></div>
        <div><span>Email: </span><span>{{ itemDetail.email }}</span></div>
      </div>
      <div>
        <span class="mr-5" @click="isShowForm = true">Edit</span>
        <span @click="store.deleteItems(+route.params.id); isItem = false">Delete</span>
      </div>
    </div>
    <div class="mt-40" v-else>
        <span>Contact deleted</span>
    </div>

    <router-link to="/" class="bg-green-500 rounded-3xl py-2 px-5 mt-10">show all</router-link>
  </div>

  <teleport to="body">
    <ContactForm
        v-if="isShowForm"
        :isEdit="true"
        :indexEdit="+route.params.id"
        @closeForm="isShowForm = false"
    />
  </teleport>
</template>

<style scoped>
a{
  color: white;
}
</style>