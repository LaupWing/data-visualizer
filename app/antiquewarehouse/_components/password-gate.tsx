"use client";

import { useActionState } from "react";
import { verifyPassword } from "../lib/auth";

export function PasswordGate() {
  const [state, formAction, isPending] = useActionState(verifyPassword, null);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-slate-900 mb-1">
          Antique Warehouse
          <span className="text-[#C41E3A] ml-2">Data Explorer</span>
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter the password to continue.
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-[#C41E3A] focus:outline-none focus:ring-1 focus:ring-[#C41E3A]"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-[#C41E3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#a3182f] disabled:opacity-50 transition-colors"
          >
            {isPending ? "Verifying..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
