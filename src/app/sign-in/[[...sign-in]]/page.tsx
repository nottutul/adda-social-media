import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex pt-10 justify-center h-screen">
      <SignIn />
    </div>
  )
}


