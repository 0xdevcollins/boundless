import React from 'react';
import AboutUsMission from './Aboutmissionbg';
import MissionText from './text';

export default function Missionpage() {
  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <AboutUsMission />
      </div>

      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <MissionText />
      </div>
    </div>
  );
}
