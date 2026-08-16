import React, { useEffect, useRef } from 'react';

export default function MainMenu() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoElement.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing webcam:", err);
        });
    }

    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleLearnClick = () => {
    console.log('Learn mode selected');
  };

  const handleCompeteClick = () => {
    console.log('Compete mode selected');
  };

  const handleFusionClick = () => {
    console.log('Fusion mode selected');
  };

  const buttonStyle = "hover:opacity-50 hover:pl-4 text-5xl font-thin"

  return (
    <div className="w-dvw h-dvh">

      <div className="absolute z-0 h-full w-full items-end justify-end flex">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-full w-[59vw] object-cover -scale-x-100 "
        />
      </div> 
      
      <div className="absolute z-50 h-full bg-black w-[41vw]"/>

      <div className="absolute z-100 py-16 px-24">
        
        <h1 className="text-[10rem] text-pink-300 font-semibold">Name</h1>
        
        <div className="flex flex-col gap-8 items-start text-pink-300">
          <button className={buttonStyle} onClick={handleLearnClick}>
            Learn
          </button>
          <button className={buttonStyle} onClick={handleCompeteClick}>
            Compete
          </button>
          <button className={buttonStyle} onClick={handleFusionClick}>
            Fusion
          </button>
        </div>

      </div>
      
    </div>
  );
}
