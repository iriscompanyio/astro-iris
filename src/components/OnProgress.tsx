import React, { useEffect, useState } from 'react'
import CardOnProgress from './CardOnProgress'

const OnProgress = ({ tasks, ids, totalTasks, setTotalTasks, change, setChange }: any) => {

    return (
        <div className='bg-[#F5F5F5] rounded-2xl h-[550px] w-3/4 overflow-y-scroll z-10'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5 pl-5 pt-5 mb-5'>
                    <p className='w-2 h-2 bg-[#FFA500] rounded-full flex justify-center items-center'></p>
                    <h1 className='font-medium font-serif'>On Progress</h1>
                    <p className='w-5 h-5 rounded-full bg-[#E0E0E0] flex justify-center items-center text-[#625F6D]'>{tasks.length}</p>
                </div>
            </div>
            <hr className='ml-5 h-[3px] bg-[#FFA500] w-5/6' />
            <div className='flex flex-col items-center gap-5 mt-5'>
                {tasks.map((task: any, ix: number) =>
                (
                    <CardOnProgress key={ix} id={ids[ix]} task={task} totalTasks={totalTasks} setTotalTasks={setTotalTasks} change={change} setChange={setChange} />
                )
                )}</div>
        </div >
    )
}

export default OnProgress;