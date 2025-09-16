import React from 'react';
import AboutUsMission from './Aboutmissionbg';
import MissionText from './text';

export default function Missionpage() {
  return (
    <div className='relative  bg-black text-white overflow-hidden md:my-16 my-5 mx-6 md:mx-12 lg:mx-[100px] min-h-[80vh] h-full'>
      <div className='absolute inset-0 z-0'>
        <AboutUsMission />
      </div>

      <div className='absolute inset-0 z-10 flex items-center min-h-[60vh] justify-center '>
        <MissionText />
      </div>
    </div>
  );
}
