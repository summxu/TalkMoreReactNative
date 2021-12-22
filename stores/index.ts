/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:28:17
 * @LastEditTime: 2021-12-22 11:28:27
 * @Msg: Nothing
 */
import UserStore from "./user";
import TalkMoreStore from "./talkMore";
import { makeAutoObservable } from "mobx";
import EventsStore from "./events";

class RootStore {

  userStore: UserStore
  talkMoreStore: TalkMoreStore
  eventsStore: EventsStore

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.userStore = new UserStore(this)
    this.talkMoreStore = new TalkMoreStore(this)
    this.eventsStore = new EventsStore(this)
  }

  logOut() {
    this.eventsStore.clean()
    this.userStore.clean()
    this.talkMoreStore.clean()
  }
}

export default RootStore