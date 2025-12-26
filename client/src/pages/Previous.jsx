import React from 'react'
import Nav from './Nav'

const Demo = [
]

function Previous() {
    return (
        <div>
            <Nav />
            <div className='w-screen h-screen flex justify-center items-center md:pt-15  '>
                <div className='md:w-[60%] w-[90%] h-[500px] bg-gray-400 md:p-8 p-3 rounded-lg flex flex-col gap-2'>
                    <p className='text-center text-3xl text-white'>Previous Analyzed Report </p>
                    <div className='w-full h-[90%] bg-gray-200 rounded-md overflow-auto md:p-2 p-1 flex flex-col gap-3'>
                        <div className='h-30 bg-gray-700 rounded-lg'>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Previous
