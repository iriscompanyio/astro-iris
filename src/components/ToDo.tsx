import React, { useEffect, useState } from 'react'
import CardToDo from './CardToDo'
import AddToDo from './AddToDo';

const ToDo = ({ tasks, ids, totalTasks, setTotalTasks, change, setChange }: any) => {

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setChange(!change);
    };

    return (
        <div className='bg-[#F5F5F5] rounded-2xl h-[550px] w-3/4 overflow-y-scroll '>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5 pl-5 pt-5 mb-5'>
                    <p className='w-2 h-2 bg-[#5030E5] rounded-full flex justify-center items-center'></p>
                    <h1 className='font-medium font-serif'>To Do </h1>
                    <p className='w-5 h-5 rounded-full bg-[#E0E0E0] flex justify-center items-center text-[#625F6D]'>{tasks.length}</p>
                </div>
                <div className='flex justify-center items-center pb-1 w-5 h-5 rounded mr-5 cursor-pointer' style={{ backgroundColor: "rgba(80, 48, 229, 0.1)" }}>
                    <p className='text-[#5030E5] text-center text-xl' onClick={openModal}>+</p>
                </div>
            </div>
            <hr className='ml-5 h-[3px] bg-[#5030E5] w-5/6' />
            <div className='flex flex-col items-center gap-5 mt-5'>
                {tasks.map((task: any, ix: number) =>
                (
                    <CardToDo key={ix} id={ids[ix]} task={task} totalTasks={totalTasks} setTotalTasks={setTotalTasks} change={change} setChange={setChange} />
                )
                )}
            </div>
            {isOpenModal && <AddToDo closeModal={closeModal} totalTasks={totalTasks} setTotalTasks={setTotalTasks} />}
        </div >
    )
}

export default ToDo;