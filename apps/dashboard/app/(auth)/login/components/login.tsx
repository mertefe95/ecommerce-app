'use client';
import Link from 'next/link';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
//import { toast } from '@repo/ui/utility/use-toast';
import { axiosInstance } from '@web/common/api';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '@web/context/user-context';
import { LoginRequest, LoginResponse } from '@web/interfaces/registration';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@repo/ui/components/form';
import { useRouter } from 'next/navigation';
import { RoutePath } from '@dashboard/constants';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Please type your email.',
    })
    .email({ message: 'Invalid email address' }),
  password: z.string({
    required_error: 'Please type your password.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();

  const { getCurrentUser } = useContext(UserContext);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    login.mutate(data);
  }

  const login = useMutation({
    mutationFn: (data: LoginRequest) => {
      return axiosInstance.post(RoutePath.AUTH + '/login/admin', data);
    },

    onSuccess: (response: { data: LoginResponse }) => {
      router.push('/');
      toast.success(`You've been logged in`);
      if (getCurrentUser) getCurrentUser();
    },
  });

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      href='#'
                      className='ml-auto inline-block text-sm underline'
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid gap-4'>
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='#' className='underline'>
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
