# Picker Frontend (Deno Fresh)

교육/운영 플랫폼 Picker의 프론트엔드입니다. Fresh 기반으로 UI를 구성하고,
WharfKit을 통해 블록체인 생태계(지갑 연결, 트랜잭션 서명)를 단계적으로
접목합니다.

## 기술 스택
- Deno Fresh 1.7.3
- Preact
- WharfKit Session Kit

## 시작하기
1. Deno 최신 버전 설치
2. 개발 서버 실행
   ```bash
   deno task dev
   ```
   - Vite 기반 개발 서버를 사용하려면:
     ```bash
     deno task dev:vite
     ```
3. 브라우저에서 `http://127.0.0.1:8001` 접속

## 백엔드 연동
- 기본 API 베이스: `http://127.0.0.1:8000`
- 인증/계정
  - `POST /accounts/auth/login`
  - `GET /accounts/auth/me`
  - `POST /accounts/auth/refresh`
  - `POST /accounts/auth/logout`
  - `POST /accounts/auth/verify-email/request`
  - `POST /accounts/auth/verify-email/confirm`
  - `POST /accounts/auth/password-reset/request`
  - `POST /accounts/auth/password-reset/confirm`
- OAuth
  - Google: `GET /accounts/auth/google/start`, `GET /accounts/auth/google/callback`
  - Apple: `GET /accounts/auth/apple/start`, `GET /accounts/auth/apple/callback`
  - 성공 리디렉션: `OAUTH_SUCCESS_REDIRECT`
  - 실패 리디렉션: `OAUTH_FAILURE_REDIRECT`

## WharfKit 초기화 포인트
- `islands/WalletConnect.tsx`에서 Session Kit 로딩 스텁을 제공
- 체인/지갑 플러그인 설정을 추가하면 즉시 실연동 가능