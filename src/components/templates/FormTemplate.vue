<template>
  <div
    class="wrap d-flex justify-content-center flex-column align-items-center"
  >
    <div class="w-50 card">
      <div class="card-header">
        <slot name="form-header" />
      </div>
      <div class="card-body">
        <slot name="form-body" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  min-height: calc(100vh - $nav-bar-height);
}
</style>
