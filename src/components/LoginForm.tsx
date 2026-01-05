
import { useState } from "react";
import { useAuthContext } from "@/auth/AuthContext";

export default function LoginForm() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-3">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="border rounded w-full p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          className="border rounded w-full p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2 w-full"
        disabled={busy}
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
