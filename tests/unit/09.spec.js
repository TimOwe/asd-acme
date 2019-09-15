import { createLocalVue, shallowMount } from "@vue/test-utils";
import QCard from "../../src/modules/09-game-playing/components/question-card.vue";

describe("Question Card", () => {
    it("Answer Questions correctly", () => {
        const props = {
            questionText: "Question Text",
            correct: 1,
            score: 100
        }
        const myAnswer = 1;
        const localVue = createLocalVue();
        const wrapper = shallowMount(QCard, {
            localVue,
            propsData: props
        });
        wrapper.vm.answer(myAnswer);
        expect(wrapper.vm.isAnswered).toBe(true);
        expect(wrapper.vm.colourStyle).toEqual("light-green");
        expect(wrapper.emitted().answer[0]).toEqual([true, props.score, props.questionText, myAnswer])
        expect(wrapper.vm.feedbackText).toEqual("")
    });

    it("Answer Questions Incorrectly", () => {
        const props = {
            questionText: "Test Question Text",
            correct: 1,
            score: 100
        }
        const myAnswer = 2;
        const localVue = createLocalVue();
        const wrapper = shallowMount(QCard, {
            localVue,
            propsData: props
        });
        wrapper.vm.answer(myAnswer);
        expect(wrapper.vm.isAnswered).toBe(true);
        expect(wrapper.vm.colourStyle).toEqual("red");
        expect(wrapper.emitted().answer[0]).toEqual([false, 0, props.questionText, myAnswer])
        expect(wrapper.vm.feedbackText).toEqual("Incorrect!")
    });
});