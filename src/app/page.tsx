'use client';

import { Button } from '@/components/ui/button';
import { Video, Bot } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast({ title: 'Login Successful', description: `Welcome back, ${user.displayName}!` });
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Google Sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred during sign-in.',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <Video className="h-24 w-24 text-primary" strokeWidth={1.5} />
            <Bot className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full border-4 border-background bg-accent p-1.5 text-accent-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold tracking-tighter text-foreground sm:text-6xl">
            NeonVid
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI-Powered Video Creation Studio.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full max-w-xs group font-semibold"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-5 w-5 fill-current transition-transform group-hover:scale-110"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.62-3.99 1.62-4.97 0-9-4.03-9-9s4.03-9 9-9c2.69 0 4.75 1.04 6.3 2.5l2.5-2.5C19.16 1.14 16.14 0 12.48 0 5.6 0 0 5.6 0 12.48s5.6 12.48 12.48 12.48c3.47 0 6.3-1.22 8.36-3.37 2.13-2.2 2.7-5.35 2.7-8.54 0-.6-.05-1.18-.16-1.74z"></path>
            </svg>
            Sign in with Google
          </Button>
           <Button asChild variant="link" size="lg" className="w-full max-w-xs">
            <Link href="/dashboard">Continue as Guest</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
