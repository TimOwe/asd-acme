import { createLocalVue, shallowMount } from "@vue/test-utils";
import QCard from "../../src/modules/03-user-administration/components/log-table.vue";

describe("User Logs", () => {
    it("Log User Activity", () => {
        handleShowLogs(logs){
            this.activeLogs = logs;
            this.LogsDialog = true;
        }
        const localVue = createLocalVue();
        const wrapper = shallowMount(QCard, {
            localVue,
            propsData: props
        });
        wrapper.vm.handleShowLogs("x");
        expect(wrapper.vm.activeLogs).toEqual("x");
        expect(wrapper.vm.LogsDialog).toBe(true);
    });
});