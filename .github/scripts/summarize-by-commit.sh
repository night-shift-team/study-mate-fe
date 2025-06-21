#!/bin/bash

set -e  # 오류 발생 시 즉시 종료
set -x  # 실행되는 명령어 출력

echo "🤖 GPT-4o 커밋 요약을 시작합니다..."

echo "summary.md 초기화"
echo "🤖 **자동 생성된 커밋 요약 (GPT-4o)**" > summary.md
echo "" >> summary.md

while read COMMIT_HASH; do
  SHORT_HASH=$(echo "$COMMIT_HASH" | cut -c1-7)
  COMMIT_MSG=$(git log -1 --pretty=format:"%s" "$COMMIT_HASH")
  COMMIT_DIFF=$(git show --no-color --pretty=format:"" "$COMMIT_HASH")

  echo "⏳ $SHORT_HASH 커밋 요약 중..." >> summary.md

  PROMPT="다음은 커밋 메시지와 코드 변경 내용입니다. 커밋 단위로, 한국어로 요약을 해주세요. 요약은 다음 형식을 반드시 따르세요:

형식:
### 🧾 [제목] (\`커밋 ID 앞 7자리\`)
- 주요 변경사항 1
- (선택적으로 주요 변경사항 2)

조건:
- 제목은 한 줄로 핵심 기능을 요약
- 주요 변경사항은 최대 2개, 단 1개만 있어도 충분함
- 변경된 기능이 하나라면 부가설명 없이 해당 내용만 작성
- 너무 추상적이거나 짧은 요약은 피해주세요
- 코드 컨텍스트를 기반으로 의미를 추론해 설명해주세요

커밋 메시지:
$COMMIT_MSG

변경 내용:
\`\`\`diff
$COMMIT_DIFF
\`\`\`"

  RESPONSE=$(jq -n \
  --arg model "gpt-4o" \
  --arg system "당신은 친절한 한국어 기술 요약 작성자입니다." \
  --arg prompt "$PROMPT" \
  '{
    model: $model,
    messages: [
      { role: "system", content: $system },
      { role: "user", content: $prompt }
    ],
    temperature: 0.3
  }' | curl -s https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d @-)

CONTENT=$(echo "$RESPONSE" | jq -r '.choices[0].message.content')
echo "✅ $SHORT_HASH 응답 수신됨"
echo "▶︎ 요약 내용:\n$CONTENT"
SUMMARY_TITLE=$(echo "$CONTENT" | grep '^### 🧾' | sed 's/^### 🧾 //;s/ (`.*//')
SUMMARY_BODY=$(echo "$CONTENT" | sed -n 's/^### 🧾.*//p;/^- /p')

echo "### 🧾 $SUMMARY_TITLE (\`$SHORT_HASH\`)" >> summary.md
echo "$SUMMARY_BODY" >> summary.md
echo "" >> summary.md
  echo "" >> summary.md
done < commits.txt

echo "📄 summary.md 작성 완료"
