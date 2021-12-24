/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-24 17:04:36
 * @Msg: Nothing
 */
import { makeAutoObservable } from "mobx";
import RootStore from "./index";

class EventsStore {
  rootStore: RootStore


  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = rootStore
  }

  initMessageQueue() {
    const { talkMore } = this.rootStore.talkMoreStore
    if (talkMore) {
      talkMore.callOnEachEvent((event: any) => {
        console.log(event)
      }, ['message']);
    }
  }

  clean() { }


}

export default EventsStore