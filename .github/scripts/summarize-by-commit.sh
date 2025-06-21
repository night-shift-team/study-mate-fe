#!/bin/bash

echo "🤖 **자동 생성된 커밋 요약 (GPT-4o)**" > summary.md
echo "" >> summary.md

while read COMMIT_HASH; do
  SHORT_HASH=$(echo $COMMIT_HASH | cut -c1-7)
  COMMIT_MSG=$(git log -1 --pretty=format:"%s" $COMMIT_HASH)
  COMMIT_DIFF=$(git show --no-color --pretty=format:"" $COMMIT_HASH)

  PROMPT=$(cat <<EOF
다음은 커밋 메시지와 코드 변경 내용입니다. 한국어로 간결한 요약을 작성해주세요.

커밋 메시지:
$COMMIT_MSG

변경 내용:
\`\`\`diff
$COMMIT_DIFF
\`\`\`

결과 형식은 다음과 같이 해주세요:

제목: 한 줄로 요약된 변경 내용  
주요 변경사항:  
- 주요 변경사항 1  
- 주요 변경사항 2
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

  echo "### 🧾 $SUMMARY_TITLE (\`$SHORT_HASH\`)" >> summary.md
  echo "$SUMMARY_BODY" >> summary.md
  echo "" >> summary.md

done < commits.txt
