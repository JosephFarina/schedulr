import { IStore } from 'redux-mock-store'

export function getFirstDispatchPayload(store: IStore<any>) {
  return store.getActions()[0].payload
}
