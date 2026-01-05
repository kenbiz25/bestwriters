
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Loader2 } from "lucide-react";

import { auth, db } from "@/integrations/firebase/client";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "@/auth/AuthContext";

type Profile = {
  role?: string;
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Use global auth state from context (already set up in App.tsx)
  const { user, loading } = useAuthContext();

  useEffect(() => {
    // Wait until the auth context finishes resolving
    if (loading) return;

    const verifyExistingSession = async () => {
      try {
        if (!user) {
          setIsCheckingAuth(false);
          return;
        }
        // Check Firestore role
        const snap = await getDoc(doc(db, "profiles", user.uid));
        const profile = snap.exists() ? (snap.data() as Profile) : {};
        if (profile.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          await signOut(auth);
          toast({
            title: "Access denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
          setIsCheckingAuth(false);
        }
      } catch (err: any) {
        await signOut(auth);
        toast({
          title: "Session check failed",
          description: err?.message ?? "Could not verify admin role.",
          variant: "destructive",
        });
        setIsCheckingAuth(false);
      }
    };

    void verifyExistingSession();
  }, [user, loading, navigate, toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const emailTrimmed = email.trim();
      const passwordTrimmed = password.trim();
      const cred = await signInWithEmailAndPassword(auth, emailTrimmed, passwordTrimmed);

      // Check role after successful sign-in
      const uid = cred.user.uid;
      const snap = await getDoc(doc(db, "profiles", uid));
      const profile = snap.exists() ? (snap.data() as Profile) : {};

      if (profile.role === "admin") {
        toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
        navigate("/admin/dashboard");
      } else {
        await signOut(auth);
        toast({
          title: "Access denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error?.message ?? "Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="font-display text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to manage your AcademicWritingPro content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
