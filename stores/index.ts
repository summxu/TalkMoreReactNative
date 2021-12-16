/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:28:17
 * @LastEditTime: 2021-12-16 18:17:18
 * @Msg: Nothing
 */
import UserStore from "./user";
import TalkMoreStore from "./talkMore";

class RootStore {

  userStore: UserStore
  talkMoreStore: TalkMoreStore

  constructor() {
    this.userStore = new UserStore(this)
    this.talkMoreStore = new TalkMoreStore(this)
  }
}

export default RootStore