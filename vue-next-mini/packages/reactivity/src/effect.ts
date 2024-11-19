/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
  console.log('track', target, key);
  
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