import Image from 'next/image';

function AboutUsDifferent() {
  return (
    <section className='flex flex-col items-center gap-10 md:py-[100px] py-8 relative overflow-hidden md:px-0 px-4'>
      <Image
        src='bg-header-about.svg'
        alt='Header background'
        width={1240}
        height={1324}
        className='absolute top-0'
      />
      <div className='relative md:w-[1240px] w-full md:h-[200px] flex items-center justify-center pb-6'>
        <h1 className='font-normal text--[32px] md:text-5xl text-white text-center'>
          What Makes Boundless
          <br className='md:hidden block' /> Different
        </h1>
      </div>
      <main className='flex flex-col gap-6  md:w-[1240px] w-full md:h-[884px]'>
        <div className='flex gap-6 justify-center md:flex-row flex-col items-center '>
          <main className='md:w-[716px] w-[350px]   h-[430px] rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop:blur-2xl p-6 flex flex-col items-center gap-6 text-left'>
              <div className='md:w-[668px] w-[302px] md:h-[269px] h-[243px] flex justify-center items-center'>
                <Image
                  src='card1.svg'
                  width='520'
                  height='241'
                  alt='Milestone Escrow'
                />
              </div>
              <div className='px-8 py-6 pb-1 flex flex-col  gap-2.5'>
                <h4 className='font-semibold text-base text-white'>
                  Validation First
                </h4>
                <p className='font-normal text-base text-stepper-text-inactive'>
                  Ideas are filtered through community-driven voting and
                  feedback before funds <br /> are raised.
                </p>
              </div>
            </div>
          </main>

          <main className='md:w-[500px] w-[350px] h-[430px] rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop:blur-2xl p-6 flex flex-col items-center gap-6 text-left'>
              <div className='md:w-[452px] w-[302px] md:h-[269px] h-[243px] flex justify-center items-center'>
                <Image
                  src='card2.svg'
                  width={452}
                  height={205}
                  alt='Milestone Escrow'
                />
              </div>
              <div className='px-8 py-6 pb-1 flex flex-col  gap-2.5'>
                <h4 className='font-semibold text-base text-white'>
                  Milestone Escrow
                </h4>
                <p className='font-normal text-base text-stepper-text-inactive'>
                  Backers are protected. Funds are only released <br /> when
                  project milestones are achieved and verified.
                </p>
              </div>
            </div>
          </main>
        </div>
        <div className='flex gap-6 justify-center md:flex-row flex-col items-center'>
          <main className='md:w-[500px] w-[350px] h-[430px] rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop:blur-2xl p-6 flex flex-col items-center gap-6 text-left'>
              <div className='md:w-[452px] w-[302px] md:h-[269px] h-[243px] flex justify-center items-center'>
                <Image
                  src='card3.svg'
                  width={452}
                  height={205}
                  alt='Milestone Escrow'
                />
              </div>
              <div className='px-8 py-6 pb-1 flex flex-col  gap-2.5'>
                <h4 className='font-semibold text-base text-white'>
                  Inclusive Growth
                </h4>
                <p className='font-normal text-base text-stepper-text-inactive'>
                  Crowdfunding, grants, and hackathons all opportunities in one
                  ecosystem.
                </p>
              </div>
            </div>
          </main>
          <main className='md:w-[716px] w-[350px] h-[430px] rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop:blur-2xl p-6 flex flex-col items-center gap-6 text-left'>
              <div className='md:w-[668px] w-[302px] md:h-[269px] h-[243px] flex justify-center items-center'>
                <Image
                  src='card4.svg'
                  width='620'
                  height='258'
                  alt='Milestone Escrow'
                />
              </div>
              <div className='px-8 py-6 pb-1 flex flex-col  gap-2.5'>
                <h4 className='font-semibold text-base text-white'>
                  Blockchain-Powered
                </h4>
                <p className='font-normal text-base text-stepper-text-inactive'>
                  Built on Stellar and integrated with Trustless Work for
                  secure, transparent funding.
                </p>
              </div>
            </div>
          </main>
        </div>
      </main>
    </section>
  );
}

export default AboutUsDifferent;
