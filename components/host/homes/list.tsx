import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check, Clock, Home, MessagesSquare } from 'lucide-react'
import Image from 'next/image'

export default function List() {
  return (
    <div>
      <h1 className="text-6xl font-bold text-center mb-16 tracking-tighter">
        It’s easy to list your <br /> home on Spotly
      </h1>
      <div>
        <Image
          src={'/assets/phone-demo.avif'}
          alt="phone demo"
          width={1920}
          height={1118}
          className="rounded-2xl mx-auto w-2/3"
        />
      </div>
      <div className="flex justify-between items-center gap-8 mt-16 w-full max-w-screen-sm lg:max-w-screen-md mx-auto">
        <div className="flex justify-center items-center flex-col gap-2">
          <Button variant={'secondary'} size={'icon'} className="h-12 w-12">
            <Home style={{ width: 24, height: 24 }} />
          </Button>
          <p className="mt-2 text-center text-sm lg:text-lg">
            Create a listing for your <br /> place in just a few steps
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <Button variant={'secondary'} size={'icon'} className="h-12 w-12">
            <Clock style={{ width: 24, height: 24 }} />
          </Button>
          <p className="mt-2 text-center text-sm lg:text-lg">
            Go at your own pace, and <br /> make changes whenever
          </p>
        </div>
        <div className="flex justify-center items-center flex-col gap-2">
          <Button variant={'secondary'} size={'icon'} className="h-12 w-12">
            <MessagesSquare style={{ width: 24, height: 24 }} />
          </Button>
          <p className="mt-2 text-center text-sm lg:text-lg">
            Get 1:1 support from <br /> experienced hosts at any time
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center items-center my-16">
        <Button variant={'default'} className="rounded-full w-64 h-12 text-base">
          Home Setup
        </Button>
      </div>

      <div className="my-20">
        <Image src={'/assets/aircover.avif'} width={720} height={295} alt="air cover" className="mx-auto w-44" />

        <h1 className="text-6xl font-bold text-center tracking-tighter mt-4">
          However you host, <br /> you’re protected
        </h1>
        <p className="text-2xl font-medium text-center text-foreground/60 mt-8">
          Top-to-bottom protection, included every time <br /> you host your home on Airbnb.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="flex justify-between gap-4 items-center py-4">
          <p>Up to $3m USD damage protection</p>
          <Check />
        </div>
        <Separator />
        <div className="flex justify-between gap-4 items-center py-4">
          <p>Up to $1m USD liability insurance</p>
          <Check />
        </div>
        <Separator />
        <div className="flex justify-between gap-4 items-center py-4">
          <p>24-hour safety line</p>
          <Check />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button className="my-10 h-12 w-44 mx-auto rounded-full">Learn about AirCover</Button>
        <p className="max-w-screen-md text-center mx-auto text-sm">
          Host Damage Protection reimburses for certain guest damages during Airbnb stays. It’s not insurance and may apply if
          guests don’t pay. Liability insurance is provided by 3rd parties.
          <span className="underline"> Check details and exclusions.</span>
        </p>
      </div>

      <div className="my-20">
        <h1 className="text-6xl font-bold text-center mb-16 tracking-tighter">
          All the tools you need <br /> to host, all in one app
        </h1>
        <div className="flex items-center w-full gap-4 justify-center">
          <div>
            <Image src={'/assets/phone1.avif'} width={720} height={901} className="w-full h-full rounded-lg" alt="Demo 1" />
            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="font-medium text-lg">Listing editor</h3>
              <p className="text-foreground/70 font-medium">Showcase every detail of your home</p>
            </div>
          </div>
          <div>
            <Image src={'/assets/phone1.avif'} width={720} height={901} className="w-full h-full rounded-lg" alt="Demo 2" />
            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="font-medium text-lg">Calendar</h3>
              <p className="text-foreground/70 font-medium">Manage your availability and pricing</p>
            </div>
          </div>
          <div>
            <Image src={'/assets/phone1.avif'} width={720} height={901} className="w-full h-full rounded-lg" alt="Demo 3" />
            <div className="flex flex-col items-center justify-center mt-4">
              <h3 className="font-medium text-lg">Messages</h3>
              <p className="text-foreground/70 font-medium">Quickly message guests and support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}