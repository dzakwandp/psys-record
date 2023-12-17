<template>
  <div class="z-10">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="flex flex-col bg-white px-6 py-2 rounded-md shadow-md">
        <button
          @click="closeModal"
          class="rounded-full border border-red-600 text-red-600 text-xs w-5 h-5 self-end mb-2 -mr-4">
          X
        </button>
        <div class="flex gap-2 items-center mb-4">
          <div class="text-lg">Edit Catatan Kegiatan:</div>
          <div class="badge badge-accent badge-outline badge-lg">
            {{ currentItem.kegiatan_name }}
          </div>
        </div>
        <textarea
          v-model="editedCatatan"
          class="textarea textarea-accent w-full"
          rows="4"></textarea>
        <div class="my-4 self-center">
          <button class="btn btn-sm btn-accent" @click="saveChanges">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      editedCatatan: "",
      currentItem: null,
    };
  },
  methods: {
    openModal(item) {
      this.currentItem = item;
      this.editedCatatan = item.catatan_kegiatan;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    saveChanges() {
      // Update the catatan_kegiatan field in your data
      this.currentItem.catatan_kegiatan = this.editedCatatan;

      // Implement logic to save changes, such as calling an API
      // For simplicity, we're not making an API call in this example

      this.closeModal(); // Close the modal after saving changes
    },
  },
};
</script>
