import zh from 'grapesjs/locale/zh'
import en from 'grapesjs/locale/en'
import zhCN from './zh_CN'
import zhHK from './zh_HK'
import enUS from './en_US'
import { merge } from 'lodash'

const LOCALE_MAP = {
  zh_CN: { locale: 'zh_CN', builtin: zh, ext: zhCN },
  zh_HK: { locale: 'zh_HK', builtin: zh, ext: zhHK },
  en_US: { locale: 'en_US', builtin: en, ext: enUS },
}

export default function getLocaleConfig(lang) {
  const cfg = LOCALE_MAP[lang] || LOCALE_MAP.zh_CN
  const localeKey = cfg.locale
  return {
    locale: localeKey,
    messages: { [localeKey]: merge({}, cfg.builtin, cfg.ext) },
    detectLocale: false,
  }
}
