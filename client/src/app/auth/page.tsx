'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!isSignInLoaded) return;
    try {
      await signIn.create({ identifier: email, password });
      router.push('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleSignUp = async () => {
    if (!isSignUpLoaded) return;
    try {
      await signUp.create({ emailAddress: email, password });
      router.push('/');
    } catch (err) {
      alert('Sign up failed');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-md p-6 h-[450px] shadow-xl border">
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In */}
          <TabsContent value="sign-in">
            <CardContent className="space-y-4">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleSignIn} className="w-full">
                Sign In
              </Button>

              <div className="text-center text-sm text-muted-foreground">or</div>

              {/* Social login buttons */}
              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
              <Button variant="outline" className="w-full">
                Sign in with Facebook
              </Button>
            </CardContent>
          </TabsContent>

          {/* Sign Up */}
          <TabsContent value="sign-up">
            <CardContent className="space-y-4">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleSignUp} className="w-full">
                Sign Up
              </Button>

              <div className="text-center text-sm text-muted-foreground">or</div>

              {/* Social login buttons */}
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Facebook
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </main>
  );
}
