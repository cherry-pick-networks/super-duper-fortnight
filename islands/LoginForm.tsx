import { useSignal } from "@preact/signals";
import { login } from "../lib/api/auth.ts";

type Status = "idle" | "loading" | "success" | "error";

const getRedirectPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  if (next && next.startsWith("/")) {
    return next;
  }
  return "/learning";
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof TypeError) {
    return "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
  }
  if (error instanceof Error) {
    if (error.message.includes("401") || error.message.includes("403")) {
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    }
  }
  return "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
};

export default function LoginForm() {
  const email = useSignal("");
  const password = useSignal("");
  const status = useSignal<Status>("idle");
  const message = useSignal("");

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    if (status.value === "loading") {
      return;
    }
    status.value = "loading";
    message.value = "로그인 중입니다.";

    try {
      const tokens = await login({
        email: email.value.trim(),
        password: password.value,
      });
      if (typeof window !== "undefined") {
        window.localStorage.setItem("picker_access_token", tokens.access_token);
        window.localStorage.setItem("picker_refresh_token", tokens.refresh_token);
      }
      status.value = "success";
      message.value = "로그인에 성공했습니다. 이동 중입니다.";
      const redirectPath = getRedirectPath();
      if (typeof window !== "undefined") {
        window.location.assign(redirectPath);
      }
    } catch (error) {
      status.value = "error";
      message.value = getErrorMessage(error);
    }
  };

  return (
    <section>
      <header>
        <h2>로그인</h2>
        <p>계정 정보를 입력해 주세요.</p>
      </header>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Account</legend>
          <label>
            <strong>이메일</strong>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email.value}
              onInput={(event) => {
                const target = event.currentTarget;
                email.value = target.value;
              }}
              required
            />
          </label>
          <label>
            <strong>비밀번호</strong>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password.value}
              onInput={(event) => {
                const target = event.currentTarget;
                password.value = target.value;
              }}
              required
            />
          </label>
          <button type="submit" disabled={status.value === "loading"}>
            로그인
          </button>
        </fieldset>
      </form>
      {message.value ? <p>{message.value}</p> : null}
    </section>
  );
}
