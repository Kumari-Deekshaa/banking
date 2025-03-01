'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/user.actions"
import PlaidLink from "./PlaidLink"


const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Sign up with Appwrite & create a plaid token
      if(type==='sign-up'){
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        }
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if(type==='sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if(response){
          router.push('/')
        }
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false);
    }
  }
  return (
    // auth-form
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={'/'} className="flex cursor-pointer gap-2 items-center">
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt="Horizon logo" />
          {/* sidebar-logo */}
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 mg:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
          </h1>
          <p className="text-16 font-normal text-gray-600 ">
            {user
              ? 'Link Your Account to get started'
              : 'Please enter your details'
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant='primary'/>
        </div>
      ) : ( 
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex justify-between gap-4">
                    <CustomInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label='Address' placeholder='Enter your address' />
                  <CustomInput control={form.control} name='city' label='City' placeholder='Enter your city' />
                  <div className="flex justify-between gap-4">
                  <CustomInput control={form.control} name='state' label='State' placeholder='Ex: Rajasthan' />
                  <CustomInput control={form.control} name='postalCode' label='Postal Code' placeholder='Ex: 303604' />
                  </div>
                  <div className="flex justify-between gap-4">
                  <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth' placeholder='YYYY-MM-DD' />
                  <CustomInput control={form.control} name='ssn' label='SSN' placeholder='Ex: 1234' />
                  </div>
                </>
              )}
              <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
              <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
              <div className="flex flex-col gap-4">
                {/* form-btn */}
                <Button disabled={isLoading} type="submit" className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in'
                    ? 'Sign In' : 'Sign up'}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 text-gray-700 font-normal">
              {type === 'sign-in'
                ? "Don't have and account?"
                : "Already have an account?"
              }
            </p>
            {/* form-link */}
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="text-14 cursor-pointer font-medium text-bankGradient">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm