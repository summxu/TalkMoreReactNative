/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-22 12:14:22
 * @Msg: Nothing
 */
import TalkMore from "@/lib/index.js";
import TalkmoreRC from "@/talkmorerc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from 'mobx-persist-store';
import RootStore from "./index";

interface talkMoreType {
  reslut: Object | null
  config: Object
  callEndpoint: any
  accounts: any
  streams: any
  messages: any
  queues: any
  events: any
  users: any
  emojis: any
  typing: any
  reactions: any
  server: any
  filters: any
  callOnEachEvent: any
}

class TalkMoreStore {
  rootStore: RootStore

  talkMore: talkMoreType | null = null
  serverInfo = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "TalkMoreStore",
      properties: ["talkMore", "serverInfo"],
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
      // 登录成功
      setTimeout(() => {
        this.rootStore.userStore.setUserConf(initSdkData.config)
        // 注册事件队列
        this.rootStore.eventsStore.initMessageQueue()
      }, 0);
    } else if (initSdkData.reslut) {
      throw new Error(initSdkData.reslut.msg);
    }
  }

  setTalkmMore(payload: any) {
    this.talkMore = payload
  }

  setServerInfo(payload: any) {
    this.serverInfo = payload
  }

  clean() {
    this.talkMore = null
    clearPersistedStore(this);
  }

}

export default TalkMoreStore