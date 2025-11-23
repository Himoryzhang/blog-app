/**
 * 计算阅读时间
 * 算法：中文字符 / 一分钟阅读量 + 英文单词 / 一分钟阅读量
 * @param text 文本内容
 * @returns 阅读时间字符串，例如 "5 分钟阅读"
 */
export function calculateReadingTime(text: string): string {
  const minutes = countChineseReadingTime(text) + countEnglishWordsReadingTime(text);
  return `${minutes} 分钟阅读`;
}

export function countChineseReadingTime(text: string): number {
  const chinesCharactersReg = /\p{Script=Han}/gu
  const chineseCharacters = text.match(chinesCharactersReg) || []
  return Math.ceil((chineseCharacters || []).length / 150);
}

export function countEnglishWordsReadingTime(text: string): number {
  const englishWordsReg = /[a-zA-Z]+/g
  const englishWords = text.match(englishWordsReg) || []
  return Math.ceil((englishWords || []).length / 150);
}
