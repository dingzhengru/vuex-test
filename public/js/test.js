const myPlugin = store => {
    // 当 store 初始化后调用
    console.log('myPlugin: store init')
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
        console.log('myPlugin: mutation被調用\n', 
                     'mutation:' + JSON.stringify(mutation) + '\n', 
                     'state: ' + JSON.stringify(state));
    })
}



const store = new Vuex.Store({
    state: {
        count: 0, 
        todos: [
            { id: 1, text: 'todos1', done: true },
            { id: 2, text: 'todos2', done: false },
            { id: 3, text: 'todos3', done: true }
        ],
        msg: 'defaultMsg'
    },
    getters: {
        doneTodos: (state) => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosLen: (state, getters) => {
            return getters.doneTodos.length
        },
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id);
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }, 
        myEvent(state, n) {
            state.msg = 'myEvent, ' + JSON.stringify(n);
        }, 
        myEvent2(state, payload) {
            state.msg = 'myEvent2, payload.type:' + payload.type + 
                        ', payload.amount:' + payload.amount;
        }
    },
    actions: {
        myEventAsync (context, payload) {
            // 假設不是用context直接接而用({ commit }) 就可以直接用commit()
            context.commit('myEvent', payload);
        }, 
        actionA ({ commit }) {
            // { commit } 就可以不用context.commit() 可以直接 commit()
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })  
        },
    },
    plugins:[myPlugin]
})

// Vuex
// 然後可以過store.state.count來獲取
// 以及通過store.commit()觸發狀態改變
// store.commit('increment') => store.state.count => 1

var app = new Vue({
    el: '#app', 
    data: {}, 
    methods: {
        commitIncrement: function() {
            store.commit('increment')
            return store.count;
        }
    }
});

// 新增一個子組件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            // return store.state.count
            return this.$store.state.count
        }
    }
}

// 父組件 可以在new Vue時直接引入，並可以提供給子組件(component)
// 子組件就可以改用this.$store來獲取


var app1 = new Vue({
    el: '#app1', 
    store,
    components: { Counter },
});

var app2 = new Vue({
    el: '#app2', 
    store,
    computed: {
        doneTodosLen: function() {
            return this.$store.getters.doneTodosLen
        }
    }
});

var app3 = new Vue({
    el: '#app3', 
    store,
});

var app4 = new Vue({
    el: '#app4', 
    store,
});

var app5 = new Vue({
    el: '#app5', 
    store,
});

var app6 = new Vue({
    el: '#app6', 
    store,
});