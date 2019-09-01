import { createLocalVue, shallowMount } from "@vue/test-utils";
import QCard from "../../src/modules/09-game-playing/components/question-card.vue";

describe("Question Card", () => {
    it("Answer Questions correctly", () => {
        const props = {
            questionText: "Test",
            correct: 0,
            score: 100
        }
        const localVue = createLocalVue();
        const wrapper = shallowMount(QCard, {
            localVue,
            propsData: props
        });
        wrapper.vm.answer(0);
        expect(wrapper.vm.isAnswered).toBe(true);
        expect(wrapper.vm.colourStyle).toEqual("light-green");
        expect(wrapper.emitted().answer[0]).toEqual([true, 100])
        expect(wrapper.vm.feedbackText).toEqual("")
    });

    it("Answer Questions Incorrectly", () => {
        const props = {
            questionText: "Test",
            correct: 0,
            score: 100
        }
        const localVue = createLocalVue();
        const wrapper = shallowMount(QCard, {
            localVue,
            propsData: props
        });
        wrapper.vm.answer(1);
        expect(wrapper.vm.isAnswered).toBe(true);
        expect(wrapper.vm.colourStyle).toEqual("red");
        expect(wrapper.emitted().answer[0]).toEqual([false, 0])
        expect(wrapper.vm.feedbackText).toEqual("Incorrect!")
    });
});