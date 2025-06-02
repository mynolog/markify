import Providers from '@/providers/Providers'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div>
        <main>{children}</main>
      </div>
    </Providers>
  )
}
