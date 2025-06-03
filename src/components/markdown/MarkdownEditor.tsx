import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'

import { programmersTextToMarkdown } from '@/lib/parser'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { downloadTextFile } from '@/lib/download'

export default function MarkdownEditor() {
  const [inputText, setInputText] = useState('')
  const [markdown, setMarkdown] = useState('')

  const handleConvert = () => {
    const converted = programmersTextToMarkdown(inputText)
    setMarkdown(converted)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      toast('클립보드로 복사되었습니다. 원하는 곳에 붙여넣기 해보세요!')
    } catch (error: unknown) {
      console.error(error)
      toast.error('복사에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  const handleDownloadFile = () => {
    downloadTextFile(markdown, 'README.md')
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Textarea
        className="h-80"
        placeholder="내용을 입력하세요."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="flex gap-2">
        <Button onClick={handleConvert} disabled={!inputText}>
          마크다운으로 변환
        </Button>
        <Button onClick={handleCopy} variant="outline" disabled={!markdown}>
          클립보드로 복사
        </Button>
        <Button onClick={handleDownloadFile} variant="outline" disabled={!markdown}>
          .md 파일로 저장
        </Button>
      </div>

      <div className="prose max-w-none border-t pt-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
