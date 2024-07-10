<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import {computed, onMounted, ref} from "vue";
import ContactForm from "@/components/ContactForm.vue";
import {useRouter} from "vue-router";
import {useItemContact} from "@/store/storeItem";

const store = useItemContact()
const router = useRouter()

const isShowForm = ref(false)
const isEdit = ref(false)
const indexEdit = ref(0)
const isSearch = ref(false)

const dataFilter = computed(() => {
  return isSearch.value ? store.getFilterContact : store.getItemsContact
})

const addBtn = () => {
  isShowForm.value = true;
  isEdit.value = false;
  isSearch.value = false
}

const editBtn = (index: number) => {
  isEdit.value = true
  indexEdit.value = index
  isShowForm.value = true
}

onMounted(() => {
  store.getItems()
})
</script>

<template>
  <div class="container">
    <div class="flex flex-col">
      <h1 class="mt-20 font-bold text-green-900 text-center text-5xl">List contacts</h1>
      <div class="flex justify-center mt-10 mb-10 gap-2">
        <SearchBar
            @searched="isSearch = true"
        />
        <button
            class="py-1.5 px-3 font-bold rounded-3xl text-white"
            @click="addBtn">Add contact
        </button>
      </div>
      <div v-if="dataFilter.length !== 0"
           class="wrapper-items px-3 py-5 m-auto flex flex-col gap-2 justify-center rounded-2xl">
        <transition-group name="list">
          <div
              v-for="(item, index) of dataFilter"
              :key="index"
              @click.stop="router.push({name: 'detail', params: {id: index}})"
              class="item cursor-pointer py-2 px-10 bg-gray-200 w-full rounded-3xl">
            <div class="item-info flex gap-5">
              <div><span>Name: </span><span>{{ item.name }}</span></div>
              <div><span>Phone: </span><span>{{ item.phone }}</span></div>
              <div><span>Email: </span><span>{{ item.email }}</span></div>
            </div>
            <div>
            <span class="mr-3"
                  @click.stop="editBtn(index)"
                  id="edit">Edit</span>
              <span @click.stop="store.deleteItems(index)" id="delete">Delete</span>
            </div>
          </div>
        </transition-group>
      </div>
      <span class="text-center text-red-600" v-else>no contacts</span>
      <button
          class="all rounded-3xl py-2 mt-10 m-auto"
          v-if="isSearch"
          @click="isSearch = false"
      >show all
      </button>
    </div>
  </div>

  <teleport to="body">
    <ContactForm
        v-if="isShowForm"
        :isEdit="isEdit"
        :indexEdit="indexEdit"
        @closeForm="isShowForm = false"
    />
  </teleport>
</template>

<style scoped>
.wrapper-items {
  background-color: rgb(107 114 128);
  max-width: 1000px;
  width: 100%;
  position: relative;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>