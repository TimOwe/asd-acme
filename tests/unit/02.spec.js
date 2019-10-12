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
describe("Edit Profile", () => {
    it("Emits Close", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
            wrapper.vm.closeDialog();
            expect(wrapper.emitted().close).toBeTruthy();
            expect(wrapper.find('.white--text').exists()).toBe(true)
    });
    it("Test Email Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hideEmail').exists()).toBe(true);
        expect(wrapper.find('#showEmail').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{email: false}}})
        expect(wrapper.find('#hideEmail').exists()).toBe(false)
        expect(wrapper.find('#showEmail').exists()).toBe(true);
    });
    it("Test Games Played Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hidePlayed').exists()).toBe(true);
        expect(wrapper.find('#showPlayed').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{gamesPlayed: false}}})
        expect(wrapper.find('#hidePlayed').exists()).toBe(false)
        expect(wrapper.find('#showPlayed').exists()).toBe(true);
    });
    it("Test Questions Answered Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hideQuest').exists()).toBe(true);
        expect(wrapper.find('#showQuest').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{questionsAnswered: false}}})
        expect(wrapper.find('#hideQuest').exists()).toBe(false)
        expect(wrapper.find('#showQuest').exists()).toBe(true);
    });
    it("Test Correct Answers Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hideCorrect').exists()).toBe(true);
        expect(wrapper.find('#showCorrect').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{correct: false}}})
        expect(wrapper.find('#hideCorrect').exists()).toBe(false)
        expect(wrapper.find('#showCorrect').exists()).toBe(true);
    });
    it("Test Incorrect Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hideIncorrect').exists()).toBe(true);
        expect(wrapper.find('#showIncorrect').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{incorrect: false}}})
        expect(wrapper.find('#hideIncorrect').exists()).toBe(false)
        expect(wrapper.find('#showIncorrect').exists()).toBe(true);
    });
    it("Test Wins Button", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(editCard, {
            localVue,
            propsData: prop
        });
        expect(wrapper.find('#hideWins').exists()).toBe(true);
        expect(wrapper.find('#showWins').exists()).toBe(false);
        wrapper.setProps({activeUser:{profile:{wins: false}}})
        expect(wrapper.find('#hideWins').exists()).toBe(false)
        expect(wrapper.find('#showWins').exists()).toBe(true);
    });
});