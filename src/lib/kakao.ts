interface KakaoAuth {
  authorize: (settings: { redirectUri: string; state?: string }) => void;
}

interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export function initKakao() {
  const { Kakao } = window;

  if (!Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  if (!Kakao.isInitialized()) {
    if (!KAKAO_JS_KEY) {
      console.error('VITE_KAKAO_JS_KEY is not defined');
      return;
    }
    Kakao.init(KAKAO_JS_KEY);
  }
}

export function loginWithKakao(returnPath?: string) {
  const { Kakao } = window;

  if (!Kakao) {
    console.error('Kakao SDK not loaded');
    return;
  }

  initKakao();

  const redirectUrl = returnPath ? `${FRONTEND_URL}${returnPath}` : FRONTEND_URL;

  Kakao.Auth.authorize({
    redirectUri: KAKAO_REDIRECT_URI, // kakao 서버가 인가코드와 함께 이 주소로 redirect 시킴
    state: redirectUrl, // 백엔드 서버가 jwt 토큰과 함께 최종적으로 이 주소로 redirect 시킴
  });
}
