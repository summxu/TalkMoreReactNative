/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-16 19:33:36
 * @Msg: Nothing
 */
import { action, observable } from "mobx";
import RootStore from "./index";

type infoType = {
  apiKey: any
  apiURL: any
  password: any
  realm: any
  username: any
  reslut: any
}

class UserStore {

  rootStore: RootStore
  @observable info: infoType | null = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action.bound setInfo(payload: any) {
    this.info = payload
  }
}

export default UserStore