import { logoutAccount } from "@/lib/actions/user.actions"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if(loggedOut){
      router.push('/sign-in');
    }
  }
  return (
    // footer
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      {/* footer_name => flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden */}
      {/* footer_name-mobile => flex size-10 items-center justify-center rounded-full bg-gray-200 */}
      <div className={type === 'mobile' ? 'footer_name-mobile' : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName[0]}
        </p>
      </div>
      {/* footer_email => apply flex flex-1 flex-col justify-center max-xl:hidden
          footer_email-mobile => apply flex flex-1 flex-col justify-center; */}
      <div className={type === 'mobile' ? 'footer_email-mobile' : "footer_email"}>
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      {/* fooer_image */}
      <div className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center" onClick={handleLogOut}>
        <Image src='/icons/logout.svg' fill alt='logout'/>
      </div>
    </footer>
  )
}

export default Footer