import {defineStore} from "pinia";
import {ItemContact} from "@/models/interface/itemContact";


export const useItemContact = defineStore('items', {
    state: () => {
        return{
            itemsContact: [] as ItemContact[],
            filterContact: [] as ItemContact[]
        }
    },
    actions:{
        addItems(obj: ItemContact){
            this.itemsContact.push(obj)

            this.setItems()
        },
        setItems(){
            localStorage.setItem('item', JSON.stringify(this.itemsContact))
        },
        getItems(){
            const items = localStorage.getItem('item')

            if(items){
                this.itemsContact = JSON.parse(items)
            }
        },
        deleteItems(id: number){
            this.itemsContact = this.itemsContact.filter((item, index) => index !== id)
            this.setItems()
        },
        editItems(id: number, obj: ItemContact){
            this.itemsContact[id].name = obj.name
            this.itemsContact[id].phone = obj.phone
            this.itemsContact[id].email = obj.email
            this.setItems()
        },
        searchItem(words: string){
            this.filterContact = this.itemsContact.filter((item) => item.name.includes(words))
        },
    },
    getters: {
        getItemsContact: (state) => state.itemsContact,
        getFilterContact: (state) => state.filterContact
    }
})