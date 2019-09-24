<template></template>

<script>
export default {
  name: "keep-alive-component",
  mounted: function(i) {
    window.setInterval(() => {
      this.$emit("kA");
    }, 10000);
  }
};
</script>