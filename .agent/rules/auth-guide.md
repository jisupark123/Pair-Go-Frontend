---
trigger: model_decision
description: when handling authentication, API requests, or user sessions
---

# Authentication & Token Management Guidelines

이 문서는 프로젝트의 인증(Authentication) 및 토큰 관리 정책을 정의합니다. 프론트엔드 개발 및 AI 어시스턴트는 아래 규칙을 준수해야 합니다.

## 1. 토큰 저장 및 관리 (Token Storage)

- **HttpOnly Cookie 사용**: Access Token과 인증 정보는 서버에서 설정하는 **HttpOnly Cookie**를 통해 관리됩니다.
- **Client-Side 접근 금지**: 보안 강화를 위해 브라우저의 JavaScript 코드(LocalStorage, SessionStorage, `document.cookie` 등)에서 토큰을 직접 읽거나, 저장하거나, 조작하는 행위를 **엄격히 금지**합니다.
- **RefreshToken 미사용**: 현재 프로젝트 구조에서는 별도의 Refresh Token 로직을 유지 관리하지 않습니다.

`따라서 accessToken을 따로 조작할 필요가 없습니다.`
