/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-30 12:26:54
 * @Msg: Nothing
 */
import { t } from "@/translations/translate";
import * as Localization from 'expo-localization';
import i18n from "i18n-js";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translationGetters: any = {
  'zh-CN': () => require("@/translations/zh-CN.json"),
  'zh-TW': () => require("@/translations/zh-TW.json"),
  en: () => require("@/translations/en.json"),
};

const tagTrans = (localeName: string) => {
  if (localeName.includes('CN')) {
    return 'zh-CN'
  }
  if (localeName.includes('TW') || localeName.includes('MO') || localeName.includes('HK')) {
    return 'zh-TW'
  }
  if (localeName.includes('en')) {
    return 'en'
  }
  return 'zh-CN'
}

class SettingsStore {

  languageTag = tagTrans(Localization.locale)
  themeType: 'light' | 'dark' | 'auto' = 'light'

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: "SettingsStore",
      properties: ["languageTag", "themeType"],
      storage: AsyncStorage
    })
    this.setI18nConfig()
  }

  setThemeType = (payload: 'light' | 'dark' | 'auto') => {
    this.themeType = payload
  }

  setI18nConfig = (payload?: string) => {
    const tag = payload || this.languageTag
    if (payload) {
      this.languageTag = payload
    }
    // clear translation cache
    t.cache.clear!();

    // set i18n-js config
    try {
      i18n.translations = { [tag]: translationGetters[tag]() };
    } catch (error) {
      this.setI18nConfig('zh-CN')
    }

    i18n.locale = tag
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

    // console.log(locale,i18n.locale)
  };

}

export default SettingsStore