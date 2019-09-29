  
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PasswordCard from "../../src/modules/01-User-Accounts/components/Change-Password-Card";

describe("Change Password", () => {
    it("Password do not equal", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(PasswordCard, {
            localVue
        });
        wrapper.vm.pass = "password";
        wrapper.vm.rpass = "noteuqal";
        expect(wrapper.vm.isEqual()).toBe(false);
        expect(wrapper.vm.validation).toEqual("Passwords do not match")
    });
});
