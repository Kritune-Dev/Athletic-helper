import { Color, Language, ThemeType } from '@/lib/types'

type Setting = {
  color: Color
  theme: ThemeType
  language: Language | 'auto'
}

export default Setting
