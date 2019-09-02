import { createLocalVue, shallowMount } from "@vue/test-utils";
import CreatorCard from "../../src/modules/05-quiz-management/Views/Quiz-Creator";

describe("Creator Card", () => {
    it("Create Quiz Correctly", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(CreatorCard, {
            localVue
        });
        wrapper.vm.quizTitle = "Unit Test";
        wrapper.vm.description = "This is a quiz for a unit test";
        wrapper.vm.img = { name: 'Colourful', url: 'https://imgur.com/zmxFPdu.jpg' };
        wrapper.vm.questionBank = [{q: "Unit Test question 1", a: ["Unit Test Answer 1", "Unit Test Answer 2", "Unit Test Answer 3", "Unit Test Answer 4"],c: 0, score: 1000}];
        wrapper.vm.validCheck();
        expect(wrapper.vm.validCheck()).toBe(true);
        //expect(wrapper.vm.success).toBe(true);
    });

    it("Quiz Filled Out Incorrectly", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(CreatorCard, {
            localVue
        });
        wrapper.vm.quizTitle = "Unit Test";
        wrapper.vm.description = "This is a quiz for a unit test";
        wrapper.vm.img = { name: 'Colourful', url: 'https://imgur.com/zmxFPdu.jpg' };
        wrapper.vm.questionBank = [{q: "", a: ["Unit Test Answer 1", "Unit Test Answer 2", "Unit Test Answer 3", "Unit Test Answer 4"],c: 0, score: 1000}];
        wrapper.vm.validCheck();
        expect(wrapper.vm.validCheck()).toBe(false);
        //expect(wrapper.vm.success).toBe(true);
        expect(wrapper.vm.success).toBe(false);
    });
});