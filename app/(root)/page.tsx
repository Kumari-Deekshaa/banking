import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/banks.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async({ searchParams : {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({userId: loggedIn.$id});
  if(!accounts){
    return; 
  }
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  // console.log({
  //   'accountsData': accountsData,
  //   'account': account,
  //   'accounts': accounts
  // });
  

  return (
    // home
    <section className='no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll'>
      {/* home-content */}
      <div className="no-scrollbar flex w-[45vw] flex-1 flex-col gap-8 px-5 sm:px-8 py-4 lg:pt-12 lg:pb-4 xl:max-h-screen xl:overflow-y-scroll">
        {/* home-header */}
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type = 'greeting'
            title = 'Welcome'
            user = {loggedIn?.firstName || 'Guest'}
            subtext = 'Access and manage your account and transactions efficiently'
          />
          <TotalBalanceBox
            accounts = {accountsData}
            totalBanks = {accounts?.totalBanks}
            totalCurrentBalance = {accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts = {accountsData}
          transactions = {account?.transactions}
          appwriteItemId = {appwriteItemId}
          page = {currentPage}
        />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0,2)}
      />
    </section>
  )
}

export default Home