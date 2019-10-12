import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import QStepper from "../../src/modules/09-game-playing/components/question-stepper.vue";
import NCard from "../../src/modules/09-game-playing/components/nickname-entry-card.vue"

describe("Question Stepper", () => {
    it("Answers question", () => {
        const localVue = createLocalVue();
        const $db = {
            ref: jest.fn().mockReturnThis(),
            on: jest.fn().mockReturnThis()
          };
        const wrapper = shallowMount(QStepper, {
            localVue,
            mocks: {
                $db
            }
        });
        wrapper.vm.onAnswer(false, 100, "qtext", "ans")
        expect(wrapper.emitted().answer[0]).toEqual([false, 100, "qtext", "ans"])
    });
});

describe("Nickname Card", () => {
    it("Converts logged in user name", () => {
        const props = {
            activeUser: {
                fname: "test",
                lname: "ing"
            }
        }
        window.open = jest.fn()
        const localVue = createLocalVue();
        const wrapper = mount(NCard, {
            localVue,
            propsData: props,
            mocks: {
                $cookies: {
                    isKey: () => true
                }
            }
        });
        wrapper.vm.concatName()
        expect(wrapper.vm.nickname).toBe("Test I")
    });
});