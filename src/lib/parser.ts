export function programmersTextToMarkdown(text: string): string {
  const lines = text.split('\n')
  const converted: string[] = []

  const titleMap = new Map<string, string>([
    ['문제 설명', '### 문제 설명'],
    ['제한사항', '### 제한 사항'],
    ['입출력 예', '### 입출력 예'],
    ['입출력 예 설명', '### 입출력 예 설명'],
  ])

  let inTable = false
  let tableHeaderParsed = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (titleMap.has(trimmed)) {
      converted.push(titleMap.get(trimmed)!)
      inTable = trimmed === '입출력 예'
      tableHeaderParsed = false
    } else if (/^입출력 예 #\d+/.test(trimmed)) {
      converted.push(`#### ${trimmed}`)
      inTable = false

      // 입출력 예 바로 아래 줄이면서 탭(\t)을 포함하고 있는 경우 테이블 헤더로 간주
    } else if (inTable && !tableHeaderParsed && trimmed.includes('\t')) {
      const headers = trimmed.split('\t')
      converted.push(`| ${headers.join(' | ')} |`)
      converted.push(`| ${headers.map(() => '---').join(' | ')} |`)
      tableHeaderParsed = true
      // 테이블 내부이면서 테이블 헤더 파싱이 완료된 상태이고 탭(\t)을 포함하고 있는 경우 테이블 본문으로 간주
    } else if (inTable && tableHeaderParsed && trimmed.includes('\t')) {
      const row = trimmed.split('\t')
      converted.push(`| ${row.join(' | ')} |`)
    } else {
      converted.push(trimmed)
    }
  }

  return converted.join('\n')
}
