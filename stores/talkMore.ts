/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-21 14:15:17
 * @Msg: Nothing
 */
import TalkMore from "@/lib/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from 'mobx-persist-store';
import RootStore from "./index";

class TalkMoreStore {
  rootStore: RootStore

  talkmMore = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "UserStore",
      properties: ["talkmMore"],
      storage: AsyncStorage
    })
    this.rootStore = rootStore
  }

  async initTalkMoreSDK(options: any) {
    const res = await TalkMore({
      ...options,
      realm: "https://boomxu.zulipchat.com"
    })
    console.log(options, res.reslut)
    if (res.config.apiKey) {
      this.setTalkmMore(res)
      setTimeout(() => {
        this.rootStore.userStore.setUserConf(res.config)
      }, 0);
    } else {
      throw new Error(res.reslut.msg);
    }
  }

  setTalkmMore(talkMore: any) {
    this.talkmMore = talkMore
  }

  clean() {
    this.talkmMore = null
    clearPersistedStore(this);
  }

}

export default TalkMoreStore