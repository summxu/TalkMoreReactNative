/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-31 14:05:25
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

  async initMessageQueue() {
    const { talkMore } = this.rootStore.talkMoreStore
    if (talkMore) {
      const res = await talkMore.callOnEachEvent((event: any) => {
        console.log(event)
      }, ['message']);
      console.log(res)
    }
  }

  clean() { }


}

export default EventsStore