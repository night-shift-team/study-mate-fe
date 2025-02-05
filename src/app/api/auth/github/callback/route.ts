// app/api/auth/github/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  
  if (!code) {
    return NextResponse.json(
      { error: "Code not received" },
      { status: 400 }
    );
  }

  if (!process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID || !process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_SECERT) {
    return NextResponse.json(
      { error: "GitHub OAuth credentials are not configured" },
      { status: 500 }
    );
  }

  try {
    // GitHub Access Token 요청
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_SECERT,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // GitHub 사용자 정보 요청
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // 쿠키 설정을 위한 응답 생성
    const response = new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>로그인 처리중...</title>
        </head>
        <body>
          <script>
            // 쿠키 설정이 완료된 후
            window.opener.location.href = '/solveproblem';  // 부모 창 리다이렉트
            window.close();  // 현재 창 닫기
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );

    // 토큰 저장
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24시간
    });

    return response;

  } catch (error) {
    console.error("GitHub OAuth Error:", error);
    // 에러 발생 시에도 HTML로 응답하여 창 닫기
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>로그인 실패</title>
        </head>
        <body>
          <script>
            window.opener.location.href = '/login?error=auth_failed';  // 에러 페이지로 리다이렉트
            window.close();
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}