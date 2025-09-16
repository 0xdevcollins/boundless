import Image from 'next/image';

function AboutUsDifferent() {
  return (
    <section className='flex flex-col items-center gap-8 md:gap-10 relative overflow-hidden py-8 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
      <Image
        src='bg-header-about.svg'
        alt='Header background'
        width={1240}
        height={1324}
        className='absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-none h-auto opacity-80'
      />

      {/* Header Section */}
      <div className='relative w-full max-w-6xl flex items-center justify-center pb-4 md:pb-6'>
        <h1 className='font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center leading-tight'>
          What Makes Boundless
          <br className='sm:hidden' />
          <span className='hidden sm:inline'> </span>Different
        </h1>
      </div>

      {/* Cards Grid */}
      <div className='w-full max-w-6xl flex flex-col gap-4 md:gap-6'>
        {/* First Row */}
        <div className='flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch'>
          <div className='flex-1 lg:flex-[1.4]  rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop-blur-2xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-6'>
              <div className='w-full max-w-[520px] h-[200px] md:h-[240px] flex justify-center items-center'>
                <Image
                  src='card1.svg'
                  width={520}
                  height={241}
                  alt='Validation First'
                  className='w-full h-auto max-w-full max-h-full object-contain'
                />
              </div>
              <div className='px-4 md:px-8 py-4 md:py-6 flex flex-col gap-2 md:gap-2.5'>
                <h4 className='font-semibold text-base md:text-lg text-white'>
                  Validation First
                </h4>
                <p className='font-normal text-sm md:text-base text-stepper-text-inactive leading-relaxed'>
                  Ideas are filtered through community-driven voting and
                  feedback before funds are raised.
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 lg:flex-1 rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop-blur-2xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-6'>
              <div className='w-full max-w-[452px] h-[200px] md:h-[240px] flex justify-center items-center'>
                <Image
                  src='card2.svg'
                  width={452}
                  height={205}
                  alt='Milestone Escrow'
                  className='w-full h-auto max-w-full max-h-full object-contain'
                />
              </div>
              <div className='px-4 md:px-8 py-4 md:py-6 flex flex-col gap-2 md:gap-2.5'>
                <h4 className='font-semibold text-base md:text-lg text-white'>
                  Milestone Escrow
                </h4>
                <p className='font-normal text-sm md:text-base text-stepper-text-inactive leading-relaxed'>
                  Backers are protected. Funds are only released when project
                  milestones are achieved and verified.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className='flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch'>
          <div className='flex-1 lg:flex-1 rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop-blur-2xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-6'>
              <div className='w-full max-w-[452px] h-[200px] md:h-[240px] flex justify-center items-center'>
                <Image
                  src='card3.svg'
                  width={452}
                  height={205}
                  alt='Inclusive Growth'
                  className='w-full h-auto max-w-full max-h-full object-contain'
                />
              </div>
              <div className='px-4 md:px-8 py-4 md:py-6 flex flex-col gap-2 md:gap-2.5'>
                <h4 className='font-semibold text-base md:text-lg text-white'>
                  Inclusive Growth
                </h4>
                <p className='font-normal text-sm md:text-base text-stepper-text-inactive leading-relaxed'>
                  Crowdfunding, grants, and hackathons all opportunities in one
                  ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 lg:flex-[1.4] rounded-[12px] p-[1px] bg-gradient-to-b from-white/48 to-white/8'>
            <div className='w-full h-full rounded-[12px] bg-black/85 bg-[url("/card-bg.svg")] bg-no-repeat bg-center backdrop-blur-2xl p-4 md:p-6 flex flex-col items-center gap-4 md:gap-6'>
              <div className='w-full max-w-[620px] h-[200px] md:h-[240px] flex justify-center items-center'>
                <Image
                  src='card4.svg'
                  width={620}
                  height={258}
                  alt='Blockchain-Powered'
                  className='w-full h-auto max-w-full max-h-full object-contain'
                />
              </div>
              <div className='px-4 md:px-8 py-4 md:py-6 flex flex-col gap-2 md:gap-2.5'>
                <h4 className='font-semibold text-base md:text-lg text-white'>
                  Blockchain-Powered
                </h4>
                <p className='font-normal text-sm md:text-base text-stepper-text-inactive leading-relaxed'>
                  Built on Stellar and integrated with Trustless Work for
                  secure, transparent funding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsDifferent;
