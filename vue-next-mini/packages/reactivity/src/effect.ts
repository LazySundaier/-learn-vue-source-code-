type KeyToDepMap = Map<any, ReactiveEffect>
const targetMap = new WeakMap<Object, KeyToDepMap>()

//这个函数 effect 接受一个函数 fn 作为参数，并且 fn 返回一个类型为 T 的值
export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {

  }

  run() {
    activeEffect = this
    return this.fn()
  }
}

/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let depMap = targetMap.get(target)
  if (!depMap) {
    targetMap.set(target, (depMap = new Map()))
  }
  depMap.set(key, activeEffect)
  console.log(targetMap);
  
}
/**
 * 触发依赖
 * @param target 
 * @param key 
 * @param newValue 
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('trigger', target, key, newValue);
}