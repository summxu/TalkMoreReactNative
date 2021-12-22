/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-22 09:51:04
 * @Msg: Nothing
 */
import TalkMore from "@/lib/index.js";
import TalkmoreRC from "@/talkmorerc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from 'mobx-persist-store';
import RootStore from "./index";

class TalkMoreStore {
  rootStore: RootStore

  talkmMore = null
  serverInfo = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "TalkMoreStore",
      properties: ["talkmMore", "serverInfo"],
      storage: AsyncStorage
    }).then(action => {
      if (!this.serverInfo) {
        this.initTalkMoreSDK({})
      }
    })
    this.rootStore = rootStore
  }

  async getServerInfo(sdkData: any) {
    const serverRes = await sdkData.server.settings()
    this.setServerInfo(serverRes)
  }

  async initTalkMoreSDK(options: any) {
    const initSdkData = await TalkMore({
      ...options,
      realm: TalkmoreRC.realm
    })
    this.setTalkmMore(initSdkData)
    this.getServerInfo(initSdkData)
    if (initSdkData.config.apiKey) {
      setTimeout(() => {
        this.rootStore.userStore.setUserConf(initSdkData.config)
      }, 0);
    } else if (initSdkData.reslut) {
      throw new Error(initSdkData.reslut.msg);
    }
  }

  setTalkmMore(payload: any) {
    this.talkmMore = payload
  }

  setServerInfo(payload: any) {
    this.serverInfo = payload
  }

  clean() {
    this.talkmMore = null
    clearPersistedStore(this);
  }

}

export default TalkMoreStore