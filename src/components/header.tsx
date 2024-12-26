import Image from 'next/image'
import { themeConfig } from '@/lib/theme-config'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Image
            src="/placeholder.svg"
            alt="Legendary Contractors"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold">Legendary Contractors</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:flex">
            <Phone className="mr-2 h-4 w-4" />
            {themeConfig.company.phone}
          </Button>
          <Button>Get a Quote</Button>
        </div>
      </div>
    </header>
  )
}

