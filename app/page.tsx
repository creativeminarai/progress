"use client"
import ReactMarkdown from "react-markdown"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const progressData = [
  {
    date: "2月14日",
    content: `
# 2月14日

## 進捗
# 中川

## 今日やったこと

- 事業再構築補助金の実績報告の登録内容を編集
- 事業化補助金について調査
- Difyを使って音声から議事録を作成するワークフローを作成

## 気づき

- Difyで音声入力から文字起こし、議事録作成まで可能

## 次やること

- Difyの出力調整
- 進捗報告をスプレッドシートにポストする処理を実装
- 用語集シートを作成し、専門用語や社内用語を登録する処理を追加
- 用語集を表示できる画面を追加
    `,
  },
  // Add more entries here
]

export default function DailyProgress() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">日毎の進捗状況</h1>
        <Accordion type="single" collapsible className="space-y-4">
          {progressData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card overflow-hidden shadow-sm rounded-lg transition-all duration-200 ease-in-out hover:shadow-md"
            >
              <AccordionTrigger className="px-4 py-4 text-left text-lg font-medium text-card-foreground">
                {item.date}
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 pb-6 text-card-foreground">
                <div className="prose max-w-none dark:prose-invert">
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

