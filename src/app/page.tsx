import CalendarForm from '@/components/CalendarForm';
import Wrapper from '@/components/Wrapper';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <>
      <div className="bg-slate-50">
        <section>
          <Wrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
            <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
              <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="absolute w-28 left-0 -top-20 hidden lg:block"></div>
                <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold text-5xl !leading-tight md:text-6xl lg:text-7xl">
                  Track Your{' '}
                  <span className="bg-primary text-background rounded-md px-2">
                    Daily
                  </span>{' '}
                  Phrases
                </h1>
                <p className="text-lg mt-8 lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                  Never lose track of your important phrases with our{' '}
                  <span className="font-semibold">
                    intelligent tracking system
                  </span>{' '}
                  that helps you monitor your daily language progress.
                </p>

                <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                  <div className="space-y-2">
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="text-primary w-5 h-5 shrink-0" />
                      Interactive heat map visualization
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="text-primary w-5 h-5 shrink-0" />
                      Daily phrase tracking with timestamps
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="text-primary w-5 h-5 shrink-0" />
                      Progress analytics and insights
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="text-primary w-5 h-5 shrink-0" />
                      Custom categories and tags
                    </li>
                    <li className="flex gap-1.5 items-center text-left">
                      <Check className="text-primary w-5 h-5 shrink-0" />
                      Export and share your progress
                    </li>
                  </div>
                </ul>

                <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="flex -space-x-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww"
                      alt="user"
                      width={1024}
                      height={1024}
                      className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="user"
                      width={1024}
                      height={1024}
                      className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
                      alt="user"
                      width={1024}
                      height={1024}
                      className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww"
                      alt="user"
                      width={1024}
                      height={1024}
                      className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
                      alt="user"
                      width={1024}
                      height={1024}
                      className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between items-center sm:items-start">
                    <div className="flex gap-0.5">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </div>

                    <p className="text-sm">
                      <span className="font-semibold">10,847</span> active
                      trackers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CalendarForm />
          </Wrapper>
        </section>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="relative flex items-center justify-center py-10 md:py-20 w-full">
          <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
          <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
            <Image
              src="/heroimage-bg.png"
              alt="banner image"
              width={700}
              height={700}
              quality={100}
              className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
            />
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center">
        A Note A Phrase A Wisdom
      </h1>
    </>
  );
};

export default HomePage;
