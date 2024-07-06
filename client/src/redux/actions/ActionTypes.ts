export interface IAction<T, K> {
  type: T,
  payload: K,
}