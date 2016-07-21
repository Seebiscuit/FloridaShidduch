define(['app'], function storeManager(app) {
    const STORE = 'FSI'
    var store = {};

    store.getStore = function getStore () {
        var store;

        try {
            store = JSON.parse(localStorage.getItem(STORE) || {}); // if null sending {} to JSON.parse will force it to throw
        }
        catch (e) {
            if (e instanceof SyntaxError)
                store = localStorage[STORE] = {};
            else throw e;
        }

        return store;
    };

    store.setItem = function setItem(key, value) {
        var storeInstance = this.getStore();
        
        storeInstance[key] = value;

        localStorage.setItem(STORE, JSON.stringify(storeInstance));
    }

    return store;
})