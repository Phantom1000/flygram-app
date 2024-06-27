import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommunityStore = defineStore('community', () => {
  const editCommunity = ref(null)

  function setEditCommunity(community) {
    editCommunity.value = community
  }

  return { editCommunity, setEditCommunity }
})
