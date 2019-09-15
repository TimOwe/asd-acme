import {createLocalVue, shallowMount} from "@vue/test-utils";
import Leaderboard from "../../src/modules/11-user-results/views/Leaderboard.vue";

describe("Leaderboard Sorting", () => {
    it("Sorts by Ascending correctly", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(Leaderboard, {
            localVue,
        });
        wrapper.vm.sortResults('asc');
        expect(wrapper.vm.sortResults('asc')).toBeInstanceOf(Array);
    });
    it("Sorts by Descending correctly", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(Leaderboard, {
            localVue,
        });
        wrapper.vm.sortResults('desc');
        expect(wrapper.vm.sortResults('desc')).toBeInstanceOf(Array);
    });
});