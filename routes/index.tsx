import WalletConnect from "../islands/WalletConnect.tsx";

export default function Home() {
  return (
    <main class="page">
      <header class="hero">
        <p class="tag">Picker Frontend</p>
        <h1>교육 플랫폼과 블록체인 생태계를 잇는 프론트엔드</h1>
        <p class="muted">
          Deno Fresh 기반으로 구축하고, WharfKit으로 지갑 연결과 체인 상호작용을
          준비합니다.
        </p>
      </header>

      <section class="grid">
        <div class="card">
          <h2>백엔드 연동</h2>
          <p class="muted">
            기본 API 베이스 URL은 <code>http://127.0.0.1:8000</code> 입니다.
            운영 환경에서는 별도 프록시 또는 환경 변수로 교체하세요.
          </p>
          <ul class="list">
            <li>로그인: POST /accounts/auth/login</li>
            <li>프로필: GET /accounts/auth/me</li>
            <li>토큰 갱신: POST /accounts/auth/refresh</li>
          </ul>
        </div>

        <WalletConnect />
      </section>

      <section class="card">
        <h2>Learning Domain</h2>
        <p class="muted">
          Start with the mobile-first quiz flow, then expand the rest of the
          learning experience.
        </p>
        <a class="text-link" href="/learning">
          Go to Learning
        </a>
      </section>

      <section class="card">
        <h2>다음 단계</h2>
        <ul class="list">
          <li>WharfKit 체인/지갑 설정 추가</li>
          <li>학습/출결/결제 도메인별 화면 설계</li>
          <li>OAuth 성공/실패 리디렉션 페이지 구현</li>
        </ul>
      </section>
    </main>
  );
}
