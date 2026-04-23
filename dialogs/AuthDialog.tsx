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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";


const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <DialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </DialogTitle>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};


function SwitchAuth({
  mode,
  setMode,
}: {
  mode: "register" | "login";
  setMode: (m: "register" | "login") => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 text-sm">
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

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-gray-600">{label}</Label>
      {children}
    </div>
  );
};

export const AuthDialog = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"register" | "login">("register");
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const normalizeUser = (data: any) => ({
    id: data.id,
    fields: {
      firstName: data.fields.firstname,
      surname: data.fields.surname,
      email: data.fields.email,
      jobInterest: data.fields.track?.toLowerCase(),
      skillLevel: data.fields.level?.toLowerCase(),
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (mode === "register") {
          const payload = {
          firstname: form.firstName,
          surname: form.surname,
          email: form.email,
          password: form.password,
          track: form.jobInterest,
          level: form.skillLevel,
        };
  
        const registerRes = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        const registerData = await registerRes.json();
  
        if (!registerRes.ok) {
          alert(registerData.error || "Registration failed");
          return;
        }
  
        // AUTO LOGIN
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          alert(data.error);
          return;
        }
  
        login(normalizeUser(data));
  
        setForm({});
        setOpen(false);
        router.push("/track");
        return;
      }
  
      // LOGIN
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error);
        return;
      }
  
      login(normalizeUser(data));
  
      setForm({});
      setOpen(false);
      router.push("/track");
  
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        
        {/* Top gradient */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

        <div className="px-6 py-6">

          {/* Header */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* NAME */}
            {mode === "register" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First Name">
                  <Input
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                    className="h-11 rounded-xl"
                    required
                  />
                </Field>

                <Field label="Surname">
                  <Input
                    onChange={(e) =>
                      handleChange("surname", e.target.value)
                    }
                    className="h-11 rounded-xl"
                    required
                  />
                </Field>
              </div>
            )}

            {/* EMAIL */}
            <Field label="Email">
              <Input
                type="email"
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </Field>

            {/* PASSWORD */}
            <Field label="Password">
              <Input
                type="password"
                onChange={(e) => handleChange("password", e.target.value)}
                className="h-11 rounded-xl"
                required
              />
            </Field>

            {/* REGISTER ONLY */}
            {mode === "register" && (
              <>
                <Field label="Job Interest">
                  <Select
                    onValueChange={(val) =>
                      handleChange("jobInterest", val)
                    }
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl">
                      <SelectValue placeholder=" Select your track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">
                        Fullstack Development
                      </SelectItem>
                      <SelectItem value="hr">
                        Human Resources
                      </SelectItem>
                      <SelectItem value="pm">
                        Project Management
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Skill Level">
                  <Select
                    onValueChange={(val) =>
                      handleChange("skillLevel", val)
                    }
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry</SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate
                      </SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </>
            )}

            {/* CTA */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:opacity-90"
            >
              {loading
                ? "Please wait..."
                : mode === "register"
                ? "Create Account"
                : "Login"}
            </Button>
          </form>

          {/* Switch */}
          <div className="mt-5">
            <SwitchAuth mode={mode} setMode={setMode} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};