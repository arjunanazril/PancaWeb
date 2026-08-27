export function StatusMessage({ status, message }: { status?: string; message?: string }) {
  if (!status) return null;
  const isError = status === "error";

  return (
    <div
      role="status"
      className={
        isError
          ? "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          : "rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
      }
    >
      {message ?? (isError ? "Terjadi masalah. Silakan coba lagi." : "Perubahan berhasil disimpan.")}
    </div>
  );
}
