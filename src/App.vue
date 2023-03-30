<script setup>
import { onMounted, ref } from 'vue'
import { useWords } from './stores/words'

const store = useWords()

let trueWords = ref('')

let unuseword = store.unuseword

let eachWord = ref('')
let foundedWords = ref([])

let findWI = ref('')

onMounted(() => {
  chooseWord()
  mix()
})

function chooseWord() {
  let num = store.words.length
  trueWords.value = store.words[Math.floor(Math.random() * num)].word
};

function mix() {
  let counter = Math.floor(Math.random() * 3 + 3)
  let randomWord = () => unuseword[Math.floor(Math.random() * 25)]
  for (let i = 0; i < counter; i++) {
    eachWord.value += randomWord()
  }
  eachWord.value += trueWords.value
  // mix result

  let arr = eachWord.value.split('')

  for (let i = arr.length - 1; i > 0; i--) {
    let tmp = arr[i]
    let rand = Math.floor(Math.random() * (i + 1))
    arr[i] = arr[rand]
    arr[rand] = tmp
    arr.join('')
    eachWord.value = arr
  }
};

function isTrueWord(word) {
  isThereSMTH()
  if (trueWords.value.includes(word)) {
    findWI.value = trueWords.value.indexOf(word)
    foundedWords.value.push(findWI.value)
    let index = eachWord.value.indexOf(word)
    let neWord = eachWord.value.splice(index, 1)
  } else {
    alert(`${word} is not defined`)
  }
};
function changeColor(id) {
  if (foundedWords.value.includes(id)) return 'text-white'
}

function isThereSMTH() {
  let has = ref(false)
  for (const el in trueWords.value) {
    eachWord.value.forEach(el => {
      if (trueWords.value.includes(el)) {
        has.value = true
      }
    });
  }
  if (!has.value) {
    reload()
  }
};

function reload() {
  location.reload()
};

</script>
<template>
  <div class="container w-screen h-screen flex flex-col justify-center">
    <div class="top h-1/2 w-full flex flex-col justify-center gap-5 bg-slate-900 p-10">
      <div class="wordtabs w-full h-full bg-stone-500 p-5 flex justify-center items-center gap-x-5  flex-wrap">
        <div class="wordtab w-14 h-14 text-center text-3xl border-b-2 border-b-slate-700" v-for="(item, id) in trueWords"
          :key="item">
          <div class="text-transparent" :class="changeColor(id)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="unusable w-full h-full bg-black">
        <p class="unuse"></p>
      </div>
    </div>
    <div class="bottom h-1/2 w-full bg-gray-500 p-10">
      <div class="words bg-yellow-100 w-full h-full p-5 flex justify-center items-center gap-x-5  flex-wrap relative">
        <button class="word w-14 h-14 rounded-md bg-indigo-200" @click="isTrueWord(item)" v-for="item in eachWord"
          :key="item">
          {{ item }}
        </button>
        <div class="w-20 h-10 rounded-full bg-violet-600 absolute bottom-10 right-10 cursor-pointer" @click="reload">
          <span class="absolute top-1 left-4 text-lg text-white">reload</span>
        </div>
      </div>
    </div>
  </div>
</template>