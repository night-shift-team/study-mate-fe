import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    const html = `
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ authData: "${code}" }, window.location.origin);
              window.close();
            }
          </script>
        </body>
      </html>
    `;

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (e: any) {
    console.log(e);
    return new Response(e, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
