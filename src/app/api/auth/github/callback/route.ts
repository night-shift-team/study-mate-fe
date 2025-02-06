// app/api/auth/github/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('Code:', code);
  console.log('State:', state);

  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    // 응답 생성
    const response = new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>로그인 처리중...</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                          'Helvetica Neue', Arial, sans-serif;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-bottom: 20px;
              max-width: 500px;
              margin: 0 auto;
            }
            .user-info {
              margin-bottom: 20px;
              text-align: center;
            }
            .user-info img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin-bottom: 10px;
            }
            .button {
              background-color: #2ea44f;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;
              width: 100%;
            }
            .button:hover {
              background-color: #2c974b;
            }
            .info-row {
              margin: 10px 0;
              text-align: left;
              padding: 8px;
              border-bottom: 1px solid #eee;
            }
            .info-label {
              font-weight: bold;
              color: #24292e;
            }
            .info-value {
              color: #586069;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="user-info">
              <h2>GitHub 로그인 성공! 🎉</h2>
              <img src="${userData.avatar_url}" alt="Profile Image">
              <div class="info-row">
                <span class="info-label">이름:</span>
                <span class="info-value">${escapeHtml(userData.name || '이름 없음')}</span>
              </div>
              <div class="info-row">
                <span class="info-label">사용자명:</span>
                <span class="info-value">${escapeHtml(userData.login)}</span>
              </div>
            
            </div>
            <button class="button" onclick="completeLogin()">계속하기</button>
          </div>
  
          <script>
            console.log('Callback URL Parameters:', {
          code: '${code}',
          state: '${state}'
        });
            const userData = ${JSON.stringify(userData)};
            console.log('GitHub User Data:', userData);
            
function completeLogin() {
  try {
    // GitHub 사용자 데이터와 함께 인증 정보도 저장
    const authData = {
      userData,
      authInfo: {
        code: '${code}',
        state: '${state}'
      }
    };
    localStorage.setItem('githubAuthData', JSON.stringify(authData));
    console.log('Stored auth data:', JSON.parse(localStorage.getItem('githubAuthData')));
    
    // URL에 인증 정보를 포함하여 리다이렉트
    const redirectUrl = '/solveproblem?' + new URLSearchParams({
      code: '${code}',
      state: '${state}'
    }).toString();
    
    window.opener.location.href = redirectUrl;
    window.close();
  } catch (error) {
    console.error('Login completion error:', error);
    window.opener.location.href = '/solveproblem';
    window.close();
  }
}
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );

    // 토큰 저장
    response.cookies.set('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>인증 실패</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f5f5f5;
              text-align: center;
            }
            .error-container {
              background-color: #fff3f3;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .error-message {
              color: #dc3545;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h2 class="error-message">인증 실패</h2>
            <p>GitHub 로그인 중 오류가 발생했습니다.</p>
            <script>
              console.error('Authentication failed:', ${JSON.stringify((error as any).message)});
              setTimeout(() => {
                window.opener.location.href = '/login?error=auth_failed';
                window.close();
              }, 3000);
            </script>
          </div>
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
