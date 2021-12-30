/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:28:17
 * @LastEditTime: 2021-12-30 17:46:51
 * @Msg: Nothing
 */
import UserStore from "./user";
import TalkMoreStore from "./talkMore";
import { makeAutoObservable } from "mobx";
import EventsStore from "./events";
import SettingsStore from "./settings";

class RootStore {

  userStore: UserStore
  talkMoreStore: TalkMoreStore
  eventsStore: EventsStore
  settingsStore: SettingsStore

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.userStore = new UserStore(this)
    this.talkMoreStore = new TalkMoreStore(this)
    this.eventsStore = new EventsStore(this)
    this.settingsStore = new SettingsStore()
  }

  logOut() {
    this.eventsStore.clean()
    this.userStore.clean()
    this.talkMoreStore.clean()
    this.settingsStore.setThemeType('light')
  }
}

export default RootStore