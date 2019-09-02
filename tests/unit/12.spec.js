import {createLocalVue, shallowMount} from "@vue/test-utils";
import Leaderboard from "../../src/modules/11-user-results/views/Leaderboard.vue";

describe("Leaderboard Sorting", () => {
    it("Sorts by Ascending correctly", () => {
        const props = {
            sortedResults: Array
        }
        const localVue = createLocalVue();
        const wrapper = shallowMount(Leaderboard, {
            localVue,
            propsData: props,
            methods: {
                getLeaderboard: () => {
                }
            }
        });
        let dummyResults = [{
            key: '-L3790uji9kba',
            user_key: '-L783hbsbkfuab',
            calculatedName: 'Daniel Hartshorne',
            quiz_key: '111',
            score: 0.87,
            timestart: 1566105295428,
            timeend: 1566105314583
        },
            {
                key: '-L377894gh9a',
                quiz_key: '222',
                calculatedName: 'Tim Owe',
                user_key: '-L783fhsiuab',
                score: 0.76,
                timestart: 1566105295428,
                timeend: 1566105314583
            },
            {
                key: '-L376r782kba',
                user_key: '-L783tgydiuab',
                calculatedName: 'Alex Blazevski',
                quiz_key: '111',
                score: 0.49,
                timestart: 1566105295428,
                timeend: 1566106140989
            },
        ];
        wrapper.setData({sortedResults: dummyResults});
        wrapper.vm.sortResults('asc');
        expect(wrapper.vm.sortResults('asc')).toEqual(dummyResults);
    });
    it("Sorts by Descending correctly", () => {
        const props = {
            sortedResults: Array
        }
        const localVue = createLocalVue();
        const wrapper = shallowMount(Leaderboard, {
            localVue,
            propsData: props,
            methods: {
                getLeaderboard: () => {
                }
            }
        });
        let dummyResults = [{
            key: '-L376r782kba',
            user_key: '-L783tgydiuab',
            calculatedName: 'Alex Blazevski',
            quiz_key: '111',
            score: 0.49,
            timestart: 1566105295428,
            timeend: 1566106140989
        },
            {
                key: '-L377894gh9a',
                quiz_key: '222',
                calculatedName: 'Tim Owe',
                user_key: '-L783fhsiuab',
                score: 0.76,
                timestart: 1566105295428,
                timeend: 1566105314583
            },
            {
                key: '-L3790uji9kba',
                user_key: '-L783hbsbkfuab',
                calculatedName: 'Daniel Hartshorne',
                quiz_key: '111',
                score: 0.87,
                timestart: 1566105295428,
                timeend: 1566105314583
            }
        ];
        wrapper.setData({sortedResults: dummyResults});
        wrapper.vm.sortResults('desc');
        expect(wrapper.vm.sortResults('desc')).toEqual(dummyResults);
    });
});