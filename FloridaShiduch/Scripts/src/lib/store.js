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

    store.getItem = function (key) {
        var target, path, storeInstance = this.getStore();

        path = _.map(key.replace('\\.', '&#46').split('.'),  function (p) {
            return p.replace('&#46', '.');
        });

        if (path.length == 1)
           return storeInstance[key];
        else {
            target = storeInstance; // Point to ref
            for (var i = 0; i < path.length; i++) {
                if (i == path.length - 1)
                    // At path endpoint
                    return target[path[i]];
                else if (_.isEmpty(target[path[i]]))
                    // End of path
                    return target[path[i]];
                else
                    // Path exists in tree. Traversing
                    target = target[path[i]];
            }
        }
    };

    store.setItem = function (key, value) {
        var target, path, storeInstance = this.getStore();
         
        path = _.map(key.replace('\\.', '&#46').split('.'),  function (p) {
            return p.replace('&#46', '.');
        });
        
        if (path.length == 1)
            storeInstance[key] = value;
        else {
            target = storeInstance; // Point to ref
            for (var i = 0; i < path.length; i++) {
                if (i == path.length - 1)
                    // At path
                    target[path[i]] = value;
                else if (!_.isObject(target[path[i]]) || _.isArray(target[path[i]]))
                    // Item is a primitive or an array: overwriting as we're creating an object tree. 
                    // Not expecting functions
                    target = target[path[i]] = {};
                else
                    // Path exists in tree. Traversing
                    target = target[path[i]];
            }
        }

            localStorage.setItem(STORE, JSON.stringify(storeInstance));
            return value;
    }

    store.removeItem = function (key) {
        var target, path, storeInstance = this.getStore();

        path = _.map(key.replace('\\.', '&#46').split('.'),  function (p) {
            return p.replace('&#46', '.');
        });

        if (path.length == 1)
            delete storeInstance[path[0]];
        else {
            target = this.getItem(_.initial(_.map(key.replace('\\.', '&#46').split('.'), function (p) {
                return p.replace('&#46', '\\.');
            })));
            
            delete target[_.last(path)];
        }
        localStorage.setItem(STORE, JSON.stringify(storeInstance));

    }

    return store;
})