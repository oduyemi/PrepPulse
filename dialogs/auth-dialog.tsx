"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* =========================
   Shared UI
========================= */
function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center space-y-2">
      <DialogTitle className="text-2xl font-semibold tracking-tight">
        {title}
      </DialogTitle>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function SwitchAuth({
  mode,
  setMode,
}: {
  mode: "register" | "login";
  setMode: (m: "register" | "login") => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <span className="text-gray-500">
        {mode === "register" ? "Already have an account?" : "New here?"}
      </span>
      <button
        type="button"
        onClick={() => setMode(mode === "register" ? "login" : "register")}
        className="font-medium text-indigo-600 hover:underline"
      >
        {mode === "register" ? "Login" : "Create account"}
      </button>
    </div>
  );
}

/* =========================
   Unified Auth Dialog
========================= */
export function AuthDialog({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [form, setForm] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(mode === "register" ? "Register" : "Login", form);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
        {/* Gradient top */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

        <div className="p-6">
          <DialogHeader>
            <Header
              title={mode === "register" ? "Create your account" : "Welcome back"}
              subtitle={
                mode === "register"
                  ? "Start your interview journey"
                  : "Continue your preparation"
              }
            />
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">First Name</Label>
                  <Input
                    name="firstName"
                    onChange={handleChange}
                    className="rounded-xl mt-1 focus-visible:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs">Surname</Label>
                  <Input
                    name="surname"
                    onChange={handleChange}
                    className="rounded-xl mt-1 focus-visible:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="text-xs">Email</Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                className="rounded-xl mt-1 focus-visible:ring-indigo-500"
                required
              />
            </div>

            <div>
              <Label className="text-xs">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                className="rounded-xl mt-1 focus-visible:ring-indigo-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 shadow-md transition-all"
            >
              {mode === "register" ? "Create Account" : "Login"}
            </Button>
          </form>

          {/* Switch */}
          <div className="mt-6">
            <SwitchAuth mode={mode} setMode={setMode} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
