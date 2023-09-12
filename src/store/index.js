import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'
const vuexPersist = new VuexPersistence({
  storage: localStorage
})

export default createStore({
  // データの状態管理
  state: {
    count: 0,
    memos: []
  },

  // 直接データにアクセスしないために利用：stateの値を得る
  getters: {
    getCount: (state) => {
      return state.memos.length
    },
    getAll: (state) => {
      return state.memos
    },
    getMemoById: (state) => (id) => {
      return state.memos.find(memo => memo.id === id)
    }
  },
  // 直接データにアクセスしないために利用：stateの値を変化する
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    // メモを保存
    save(state, newMemo) {
      if (newMemo.id) {
        let X = state.memos.find(memo => memo.id === newMemo.id)
        X.title = newMemo.title
        X.content = newMemo.content
      } else {
        newMemo.id = ++state.count
        state.memos.unshift(newMemo)
      }
    },
    delete(state, id) {
      state.memos = state.memos.filter(memo => memo.id !== id)
    }
  },
  // 非同期通信
  actions: {
  },
  // モジュール管理用
  modules: {
    plugins: [vuexPersist.plugins]

    }
  })


// 非同期通信
// actions: {
// },

// モジュール管理用
// modules: {
// }