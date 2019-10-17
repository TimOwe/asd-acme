<template></template>

<script>
export default {
  name: "keep-alive-component",
  mounted: function(i) {
    window.setInterval(() => {
      //Update keepAlive every 10 seconds while this component is loaded
      this.$emit("kA");
    }, 10000);
  }
};
</script>