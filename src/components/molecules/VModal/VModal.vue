<template v-show="visible">
  <div class="modal fade" :id="id">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          <slot name="headerTitle" />
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot name="bodyContent" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <slot name="actionButton" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>

interface Props{
  id?:string;
  visible:boolean
}

defineProps<Props>();

</script>

<style>

</style>