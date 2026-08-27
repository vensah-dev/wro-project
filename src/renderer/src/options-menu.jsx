import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import SerialControlPanel from './components/shared/SerialControlPanel';
import { useState } from 'react';

import { useSerialContext } from './components/hooks/SerialContext';


export default function OptionsMenu({onExit}) {

  const serial = useSerialContext();
  const [transmissionEnabled, setTransmissionEnabled] = useState(true);

  return(
    <div className="relative flex h-screen w-full px-16 flex-col items-center justify-center gap-6 bg-gray-50 ">

      <SerialControlPanel
        isSupported={serial.isSupported}
        status={serial.status}
        transmissionEnabled={transmissionEnabled}
        onToggleTransmission={setTransmissionEnabled}
        errorMessage={serial.errorMessage}
        onConnect={serial.connect}
        onDisconnect={serial.disconnect}
      />


      <div className="flex justify-between w-full h-shrink items-center absolute bottom-0 px-16 py-8">
        <div onClick={onExit} className='relative text-2xl font-semibold text-pink-500/75 hover:text-pink-500/50 w-min active:gap-2 gap-0 flex items-center justify-between transition-all duration-150 ease-in-out'>
          <div className='relative h-14 aspect-square '>
            <MdOutlineKeyboardArrowLeft className='h-full w-full top-0.5 absolute'/>
          </div>
          Menu
        </div>

        <p className="text-3xl font-semibold text-black/75">Options</p>
      </div>

    </div>
  );
}