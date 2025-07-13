import React from 'react';

const LogoHeader = () => {
  return (
    <div className="w-full flex justify-center mt-4 px-4">
      <img
        src="src\logo.png" // from /public folder
        alt="App Logo"
        className="h-16 sm:h-20 md:h-24 w-auto max-w-full"
      />
    </div>
  );
};

export default LogoHeader;
