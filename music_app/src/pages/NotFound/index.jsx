import React from 'react';
import { assets } from '../../assets/assets';

const Index = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
      <img src={assets.not_found} alt="Not Found" className="w-full h-full object-cover" />
    </div>
  );
}

export default Index;
