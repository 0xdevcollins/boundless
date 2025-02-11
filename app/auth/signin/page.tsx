import RegistrationForm from "@/components/registeration-form"
import SignInButtons from "@/components/signin-buttons"
import SignInForm from "@/components/signin-form"
import { getProviders } from "next-auth/react"


export default async function SignIn() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <SignInForm />
        <RegistrationForm />
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>
          {providers && <SignInButtons providers={providers} />}
        </div>
      </div>
    </div>
  )
}

