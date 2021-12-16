/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-16 19:34:40
 * @Msg: Nothing
 */
import { observable, action } from "mobx";
import RootStore from "./index";
import TalkMore from "@/lib/index.js";

class TalkMoreStore {

  rootStore: RootStore
  @observable talkmMore = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action.bound async initTalkMoreSDK(config: any) {
    const res = await TalkMore({
      ...config,
      realm: "https://boomxu.zulipchat.com"
    })
    console.log(res)
    if (res.config.apiKey) {
      this.setTalkmMore(res)
      this.rootStore.userStore.setInfo(res.config)
      Promise.resolve(res.config.reslut)
    } else {
      Promise.reject(res.config.reslut)
    }
  }

  @action.bound setTalkmMore(talkMore: any) {
    this.talkmMore = talkMore
  }

}

export default TalkMoreStore