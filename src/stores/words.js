import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useWords = defineStore('word', () => {
  const unuseword = ['a','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','y','v','w','x','u','z']
  const words = reactive([
    {word: 'nice'},
    {word: 'fresh'},
    {word: 'lime'},
    {word: 'black'},
    {word: 'wolf'},
    {word: 'tiger'},
  ])

  return { words, unuseword }
})
