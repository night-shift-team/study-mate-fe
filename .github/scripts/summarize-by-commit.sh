#!/bin/bash

echo "🤖 **자동 생성된 커밋 요약 (GPT-4o)**" > summary.md
echo "" >> summary.md

while read COMMIT_HASH; do
  SHORT_HASH=$(echo $COMMIT_HASH | cut -c1-7)
  COMMIT_MSG=$(git log -1 --pretty=format:"%s" $COMMIT_HASH)
  COMMIT_DIFF=$(git show --no-color --pretty=format:"" $COMMIT_HASH)

PROMPT=$(cat <<EOF
다음은 커밋 메시지와 diff입니다. 각 커밋을 한 줄 제목과 1~2줄 요약으로 정리해주세요.  
아래 포맷을 꼭 따라주세요:

제목: (한 줄 요약)  
주요 변경사항:  
- 첫 번째 주요 변경사항  
- 두 번째 주요 변경사항

커밋 메시지:
$COMMIT_MSG

diff:
\`\`\`diff
$COMMIT_DIFF
\`\`\`
EOF
)


  RESPONSE=$(curl -s https://api.openai.com/v1/chat/completions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gpt-4o",
      "messages": [
        { "role": "system", "content": "당신은 친절한 한국어 기술 요약 작성자입니다." },
        {
        "role": "user",
        "content": "다음은 커밋 메시지와 코드 변경 내용입니다. 한국어로 간결한 요약을 작성해주세요.\n\n커밋 메시지:\nfix: 버튼 클릭 시 오류 수정\n\n변경 내용:\n```diff\n- const active = false;\n+ const active = true;\n```"
        }],
      "temperature": 0.3
    }')

  echo "🔍 GPT 응답 원본:"  
  echo "$RESPONSE"
  CONTENT=$(echo "$RESPONSE" | jq -r '.choices[0].message.content // empty')

  if [ -z "$CONTENT" ]; then
    echo "❗ GPT 응답이 비어 있거나 실패했습니다. summary.md 작성 스킵."
    continue  # 이 커밋은 건너뜀
  fi

  SUMMARY_TITLE=$(echo "$CONTENT" | grep '^제목:' | sed 's/제목:[ ]*//')
  SUMMARY_BODY=$(echo "$CONTENT" | sed -n '/^주요 변경사항:/,$p' | tail -n +2)

  if [ -z "$SUMMARY_TITLE" ]; then
    echo "❗ 요약 제목이 없음 → GPT 프롬프트 형식이 예상과 다름"
    echo "📦 전체 content:"
    echo "$CONTENT"
    continue
  fi

  echo "### 🧾 $SUMMARY_TITLE (\`$SHORT_HASH\`)" >> summary.md
  echo "$SUMMARY_BODY" >> summary.md
  echo "" >> summary.md

done < commits.txt
