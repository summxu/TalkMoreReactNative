/*
 * @Author: Chenxu
 * @Date: 2021-12-16 16:25:22
 * @LastEditTime: 2021-12-29 20:14:13
 * @Msg: Nothing
 */
import { t } from "@/translations/translate";
import * as Localization from 'expo-localization';
import i18n from "i18n-js";
import { makeAutoObservable } from "mobx";

const translationGetters: any = {
  // lazy requires (metro bundler does not support symlinks)
  'zh-Hans-CN': () => require("@/translations/zh-CN.json"),
  'zh-Hans-TW': () => require("@/translations/zh-TW.json"),
  'zh-CN': () => require("@/translations/zh-CN.json"),
  'zh-TW': () => require("@/translations/zh-TW.json"),
  en: () => require("@/translations/en.json"),
};

class LanguageStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.setI18nConfig()
  }

  setI18nConfig = (tag?: string) => {
    // fallback if no available language fits
    const languageTag = tag || Localization.locale

    // clear translation cache
    t.cache.clear!();

    // set i18n-js config
    try {
      i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    } catch (error) {
      this.setI18nConfig('en')
    }
    i18n.locale = languageTag

  };

}

export default LanguageStore