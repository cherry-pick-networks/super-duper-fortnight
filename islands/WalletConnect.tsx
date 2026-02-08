import { useSignal } from "@preact/signals";

const statusLabels = {
  idle: "대기",
  loading: "로딩",
  ready: "준비됨",
  error: "오류",
} as const;

type Status = keyof typeof statusLabels;

export default function WalletConnect() {
  const status = useSignal<Status>("idle");
  const message = useSignal("WharfKit 연동 준비 중입니다.");

  const onConnect = async () => {
    status.value = "loading";
    message.value = "WharfKit 모듈을 불러오는 중입니다...";

    try {
      await import("@wharfkit/session");
      status.value = "ready";
      message.value = "WharfKit 로딩 완료. 체인/지갑 설정을 추가하세요.";
    } catch (error) {
      console.error(error);
      status.value = "error";
      message.value = "WharfKit 로딩에 실패했습니다.";
    }
  };

  return (
    <section>
      <h2>지갑 연결</h2>
      <p>{message.value}</p>
      <button type="button" onClick={onConnect}>
        WharfKit 준비하기
      </button>
      <p>
        상태: <strong>{statusLabels[status.value]}</strong>
      </p>
    </section>
  );
}
