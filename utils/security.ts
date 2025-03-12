export function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("❌ 환경변수 ENCRYPTION_KEY가 설정되지 않았습니다!");
  }
  if (key.length !== 64) {
    throw new Error("❌ ENCRYPTION_KEY는 32바이트(64문자) HEX 문자열이어야 합니다!");
  }
  return Buffer.from(key, "hex");
}
