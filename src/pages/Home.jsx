import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox';

function Home() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <div className="grid grid-cols-3 h-screen overflow-hidden">
      <div className="col-span-1 text-white border-r-2 border-gray-600 overflow-hidden">
        <SideBar />
        </div>
        <div className="col-span-2 text-white bg-gray-900 h-full overflow-hidden">
        <ChatBox value={tabValue} />
        </div>
    </div>
  )
}

export default Home