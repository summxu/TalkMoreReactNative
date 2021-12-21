/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-21 14:16:15
 * @Msg: Nothing
 */
import { action, makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootStore from "./index";

export type userConfType = {
  apiKey: any
  apiURL: any
  password: any
  realm: any
  username: any
  reslut: any
}

class UserStore {
  rootStore: RootStore

  userConf: userConfType | null = null

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "UserStore",
      properties: ["userConf"],
      storage: AsyncStorage
    })
    this.rootStore = rootStore
  }

  setUserConf(payload: any) {
    this.userConf = payload
  }

  clean() {
    this.userConf = null
    clearPersistedStore(this);
  }
}

export default UserStore