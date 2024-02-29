import React from 'react'



export default function page  () {
  return (
  <div className= ' gap-1 p-0 m-0  h-screen gap-2  bg-black '>
<div className= 'grid grid-cols-12  '>


<div className='  bg-blue-600 grid grid-cols-3 col-span-3'  > PREVIEW! </div>
  <div className=" bg-green-600 grid col-span-6 ">CUE-!</div> 
    <div className=" bg-red-600 grid    col-span-3">LIVE-!</div>

</div>
    <div className= ' grid grid-cols-12 m-2 h-40  bg-black '>


        <div className='  grid grid-cols-3 col-span-3 '  ><iframe className=' w-auto h-auto' width="400px" height="200px" src="https://www.youtube.com/embed/k2L9BQJISPU" title="Today95.1fm Live Stream" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> </div>
          <div className=" grid col-span-6 ">CUE!</div> 
            <div className="grid    col-span-3"><Video className='place-self-stretch'  src={myVideo} />;</div>

    </div>

    <div className= 'h-2/3 grid grid-cols-12 '>
<div className='  bg-blue-900 grid grid-cols-3 col-span-3 from-gray-600 to-gray-900 max-h-fit '  > PREVIEW! </div>
  <div className=" bg-green-900 grid col-span-6 ">CUE!</div> 
    <div className=" bg-red-900 grid    col-span-3">play list LIVE!</div>

</div>
<div className= 'grid grid-cols-12  min-w-full  bg-gray-900  fixed bottom-5'>


        <div className='  grid grid-cols-3 col-span-3 from-gray-600 to-gray-900 '  > PREVIEW! </div>
          <div className="  grid col-span-6 ">CUE!</div> 
            <div className="grid    col-span-3">LIVE!</div>

    </div>
    <div hidden className="bg-gray-900 h-5 text-white p-0 m-0 text-center fixed bottom-10 w-screen">
      <p className="m-0 h-5 ">&copy; 2024 1TV Channel Admin Portal. All rights reserved.</p>
    </div>
</div>

  )
}
