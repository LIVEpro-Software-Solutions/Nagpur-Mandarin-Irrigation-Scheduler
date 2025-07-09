import React from 'react';

const LogoHeader = () => {
  return (
    <div className="w-full flex justify-center mt-4">
      <img
        src="/logo.png"  // from /public folder
        alt="App Logo"
        className="h-20 w-auto"
      />
    </div>
  );
};

export default LogoHeader;
