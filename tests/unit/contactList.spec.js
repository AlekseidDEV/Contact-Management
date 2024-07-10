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

    it('проверка начальных значений', () => {
        const wrapper = shallowMount(ContactList);
        expect(wrapper.vm.isShowForm).toBe(false);
        expect(wrapper.vm.isEdit).toBe(false);
        expect(wrapper.vm.indexEdit).toBe(0);
        expect(wrapper.vm.isSearch).toBe(false);
    });
})

