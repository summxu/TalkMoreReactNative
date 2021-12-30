/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-30 09:21:26
 * @Msg: Nothing
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
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