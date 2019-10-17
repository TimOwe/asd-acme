import { createLocalVue, shallowMount } from "@vue/test-utils";
import QuizCatalogue from "../../src/modules/05-quiz-management/Views/QuizCatalogue";
import VueCookies from 'vue-cookies'
const cookieHandler = VueCookies;
cookieHandler.set('user', {key: "-Lpc8bvLmB93pEmvxEu8"}, '1d');

const $cookies = cookieHandler;

describe("Creator Card", () => {
    it("Filter Quiz List Correctly", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(QuizCatalogue, {
            localVue, mocks:{
                $cookies,
            }}
        );
        wrapper.vm.category={ category: 'Animals', value: 'animals' },
        expect(wrapper.vm.quizs.length == 2)
    });


        it("Search Quiz List Correctly", () => {
            const localVue = createLocalVue();
            const wrapper = shallowMount(QuizCatalogue, {
                localVue, mocks:{
                    $cookies,
                }}
            );
            wrapper.vm.searchTerm="Endangered",
            expect(wrapper.vm.quizs.length == 1)
        });
});