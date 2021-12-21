/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:28:17
 * @LastEditTime: 2021-12-21 14:13:59
 * @Msg: Nothing
 */
import UserStore from "./user";
import TalkMoreStore from "./talkMore";
import { makeAutoObservable } from "mobx";

class RootStore {

  userStore: UserStore
  talkMoreStore: TalkMoreStore

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.userStore = new UserStore(this)
    this.talkMoreStore = new TalkMoreStore(this)
  }

  logOut() {
    this.userStore.clean()
    this.userStore.clean()
  }
}

export default RootStore