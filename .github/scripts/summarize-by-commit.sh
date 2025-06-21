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

  PROMPT="다음은 하나의 커밋에 대한 정보입니다. 커밋 메시지는 참고용일 뿐이며, 변경된 코드(diff)를 바탕으로 명확하게 어떤 기능이 어떻게 바뀌었는지를 한국어로 요약해주세요.

형식:
### 🧾 [제목] ([\`커밋 ID\`](GitHub 커밋 링크로 연결))
- 주요 변경사항 1
- 주요 변경사항 2 (필요 시)

설명:
- 제목은 한 줄로 변경 내용을 요약합니다.
- 커밋 ID는 앞 7자리만 사용하며, \`백틱\`으로 감싸 회색 배경으로 표시하고 GitHub 커밋 링크로 연결합니다.
- 주요 변경사항은 한두 줄로 리스트 형식으로 작성합니다.
- 변경된 기능이 1개라면 한 줄만 작성해도 됩니다.
- 커밋 메시지만 의존하지 말고 코드 변경 내용을 적극 반영해 주세요.
- 의미가 모호하거나 추상적인 표현은 피하고, 기능 단위로 구체적으로 작성해 주세요.

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
echo -e "▶︎ 요약 내용:\n$CONTENT"

SUMMARY_TITLE=$(echo "$CONTENT" | sed -n 's/^### 🧾 //p' | head -n1)
SUMMARY_BODY=$(echo "$CONTENT" | sed -n 's/^### 🧾.*//p;/^- /p')

echo "### 🧾 $SUMMARY_TITLE [\`$SHORT_HASH\`]($REPO_URL/commit/$COMMIT_HASH)" >> summary.md
echo "$SUMMARY_BODY" >> summary.md
echo "" >> summary.md
echo "" >> summary.md
done < commits.txt

echo "📄 summary.md 작성 완료"
