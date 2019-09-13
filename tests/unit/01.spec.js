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

    it("Password not valid", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(PasswordCard, {
            localVue
        });
        wrapper.vm.pass = "pass";
        wrapper.vm.rpass = "pass";
        expect(wrapper.vm.isValid()).toBe(false);
        expect(wrapper.vm.validation).toEqual("Passwords must be between 6-20 characters")
    });

    it("Password is valid and equal", () => {
        const localVue = createLocalVue();
        const wrapper = shallowMount(PasswordCard, {
            localVue
        });
        wrapper.vm.pass = "password";
        wrapper.vm.rpass = "password";
        expect(wrapper.vm.isValid()).toBe(true);
        expect(wrapper.vm.isEqual()).toBe(true);
    });
});