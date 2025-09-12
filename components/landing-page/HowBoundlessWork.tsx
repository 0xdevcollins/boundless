const HowBoundlessWork = () => {
  return (
    <div
      className='w-full h-full py-[98px] px-[100px] relative'
      id='how-boundless-work'
    >
      <div className='max-w-[550px] mx-auto relative'>
        <h2 className='text-white text-[48px] leading-[140%] tracking-[0.48px] text-center'>
          How Boundless Works
        </h2>
        <p className='mt-3  leading-[160%] text-center gradient-text-2'>
          From idea to impact, Boundless guides you through transparent project
          validation, secure milestone funding, and community-driven support.
        </p>
        {/* <Image src='/light.png' alt='how-boundless-work' width={1920} height={1080} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' /> */}
      </div>
      <div className='grid grid-cols-2 gap-x-10 gap-y-4'>
        <div
          className='relative h-[470px] border border-[#030303] rounded-[14px]'
          style={{
            background:
              'conic-gradient(from 270deg at 54.7% 50%, rgba(3, 3, 3, 0.50) 72.86286234855652deg, rgba(3, 3, 3, 0.00) 158.9047372341156deg, rgba(3, 3, 3, 0.50) 225.6035828590393deg, rgba(3, 3, 3, 0.70) 280.3025794029236deg, rgba(3, 3, 3, 0.60) 360deg)',
          }}
        ></div>
        <div
          className='relative h-[470px] border border-[#030303] rounded-[14px]'
          style={{
            background:
              'conic-gradient(from 270deg at 54.7% 50%, rgba(3, 3, 3, 0.50) 72.86286234855652deg, rgba(3, 3, 3, 0.00) 158.9047372341156deg, rgba(3, 3, 3, 0.50) 225.6035828590393deg, rgba(3, 3, 3, 0.70) 280.3025794029236deg, rgba(3, 3, 3, 0.60) 360deg)',
          }}
        ></div>
        <div
          className='relative h-[470px] col-span-2 border border-[#030303] rounded-[14px]'
          style={{
            background:
              'conic-gradient(from 270deg at 54.7% 50%, rgba(3, 3, 3, 0.50) 72.86286234855652deg, rgba(3, 3, 3, 0.00) 158.9047372341156deg, rgba(3, 3, 3, 0.50) 225.6035828590393deg, rgba(3, 3, 3, 0.70) 280.3025794029236deg, rgba(3, 3, 3, 0.60) 360deg)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default HowBoundlessWork;
