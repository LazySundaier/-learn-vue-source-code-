var Vue = (function (exports) {
    'use strict';

    /**
     * 收集依赖
     * @param target
     * @param key
     */
    function track(target, key) {
        console.log('track', target, key);
    }
    /**
     * 触发依赖
     * @param target
     * @param key
     * @param newValue
     */
    function trigger(target, key, newValue) {
        console.log('trigger', target, key, newValue);
    }

    var get = createGetter();
    /**
     * 闭包函数是指有权访问另一个函数作用域中的变量的函数, 创建闭包的常见方式就是在一个函数内部创建另一个函数
     */
    function createGetter() {
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            // 依赖收集
            track(target, key);
            return res;
        };
    }
    var set = createSetter();
    function createSetter() {
        return function set(target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            // 触发依赖
            trigger(target, key, value);
            return res;
        };
    }
    var mutableHandlers = {
        get: get,
        set: set
    };

    var reactiveMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, mutableHandlers, reactiveMap);
    }
    function createReactiveObject(target, baseHandlers, proxyMap) {
        var existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        var proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.reactive = reactive;

    return exports;

})({});
//# sourceMappingURL=vue.js.map
