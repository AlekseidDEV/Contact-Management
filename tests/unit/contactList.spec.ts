import {shallowMount} from "@vue/test-utils";
import ContactList from "@/components/ContactList.vue";
import {createPinia, setActivePinia} from "pinia";

describe('ContactList.vue', () => {
    beforeEach(() => {
        const pinia = createPinia()
        setActivePinia(pinia)
    })

    it('отрисовка компонента', () => {
        const wrapper = shallowMount(ContactList)
        console.log(wrapper.html())
    });
})

