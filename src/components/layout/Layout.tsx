import Providers from '@/providers/Providers'
import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="mx-auto flex h-screen w-full flex-col items-center">
        <Header />
        <main className="w-full max-w-[1200px]">{children}</main>
      </div>
    </Providers>
  )
}
