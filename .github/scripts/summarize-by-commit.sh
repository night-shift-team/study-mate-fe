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
        { "role": "user", "content": "'"${PROMPT//$'\n'/\\n}"'" }
      ],
      "temperature": 0.3
    }')

  SUMMARY_TITLE=$(echo "$RESPONSE" | jq -r '.choices[0].message.content' | grep '^제목:' | sed 's/제목:[ ]*//')
  SUMMARY_BODY=$(echo "$RESPONSE" | jq -r '.choices[0].message.content' | sed -n '/^주요 변경사항:/,$p' | tail -n +2)

  if [ -z "$SUMMARY_TITLE" ]; then
    echo "❗ 요약 제목이 비어있습니다. GPT 응답 문제 가능성 있음"
    echo "GPT 전체 응답:"
    echo "$RESPONSE"
  fi

  echo "### 🧾 $SUMMARY_TITLE (\`$SHORT_HASH\`)" >> summary.md
  echo "$SUMMARY_BODY" >> summary.md
  echo "" >> summary.md

done < commits.txt
