import { track, trigger } from "./effect"

const get = createGetter()

/**
 * 闭包函数是指有权访问另一个函数作用域中的变量的函数, 创建闭包的常见方式就是在一个函数内部创建另一个函数
 */
function createGetter() {
  return function get(target: object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)
    // 依赖收集
    track(target, key)

    return res
  }
}

const set = createSetter()
function createSetter() {
  return function set(target: object, key: string | symbol, value: unknown, receiver: object) {
    const res = Reflect.set(target, key, value, receiver)
    // 触发依赖
    trigger(target, key,value)

    return res
  }
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set
}