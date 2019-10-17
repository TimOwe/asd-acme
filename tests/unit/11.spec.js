import { createLocalVue, shallowMount } from "@vue/test-utils";
import editCard from "../../src/modules/02-user-profiles/Components/Edit-Profile-Card"
const prop = {
    activeUser:{
        profile:{
            email: true,
            gamesPlayed: true,
            questionsAnswered: true,
            correct: true,
            incorrect: true,
            wins: true
        }
    }
}
describe("Views Results", () => {
    it("Tests view results button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        wrapper.vm.closeDialog();
        expect(wrapper.emitted().close).toBeTruthy();
        expect(wrapper.find('.white--text').exists()).toBe(true)
    });
    it("Test expand results", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#viewResults').exists()).toBe(false);
        wrapper.setProps({activeUser: {profile: {email: false}}})
        expect(wrapper.find('#closeResults').exists()).toBe(false)
    });
    it("Test expand graph", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#viewGraph').exists()).toBe(false);
        wrapper.setProps({activeUser: {profile: {email: false}}})
        expect(wrapper.find('#viewGraph').exists()).toBe(false)
    });
});
