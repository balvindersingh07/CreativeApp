import React from "react";

type LoginDialogProps = {
  open: boolean;                // show/hide controlled from parent
  onClose: () => void;          // close handler from parent
  onSubmit?: (email: string, password: string) => void; // optional
};

export function LoginDialog({ open, onClose, onSubmit }: LoginDialogProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Centered modal card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="
            w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900
            shadow-xl ring-1 ring-zinc-200/70 dark:ring-zinc-800
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6">
            <h3 id="login-title" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Welcome Back
            </h3>
            <button
              aria-label="Close"
              onClick={onClose}
              className="rounded-full p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              type="button"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Login to access your creator dashboard
            </p>

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-xl border border-zinc-300 bg-white
                px-4 py-2 text-zinc-900 placeholder-zinc-400
                focus:outline-none focus:ring-2 focus:ring-[#E37A58] focus:border-[#E37A58]
                dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700
              "
              required
            />

            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full rounded-xl border border-zinc-300 bg-white
                px-4 py-2 text-zinc-900 placeholder-zinc-400
                focus:outline-none focus:ring-2 focus:ring-[#E37A58] focus:border-[#E37A58]
                dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700
              "
              required
            />

            <div className="mt-3 flex items-center justify-between">
              <a className="text-sm text-zinc-500 hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              className="
                mt-2 w-full rounded-2xl bg-[#E37A58] px-4 py-2 font-medium text-white
                shadow hover:opacity-95 active:opacity-90
              "
              type="submit"
            >
              Login
            </button>

            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don’t have an account?{" "}
              <a className="font-medium text-[#E37A58] hover:underline" href="#">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// also provide default export in case some files use it
export default LoginDialog;
