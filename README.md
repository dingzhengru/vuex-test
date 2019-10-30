# vuex-test
### State: 資料
### Getter: 運算後的資料
### Mutation: 同步的運算
### Action: 非同步的運算
### Module: 讓你可以分成多個Store(模組化)
### Plugins: 可以放多的函數至插件裡，會在Store初始化、每次Mutation調用時使用到(後者的方法為store.subscribe((mutation, state))
### Strict Mode(嚴格模式): 無論何時發生了狀態變更且不是由 mutation 函數引起的，將會拋出錯誤。這能保證所有的狀態變更都能被調試工具跟踪到。