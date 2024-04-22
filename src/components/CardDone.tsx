import { useState } from 'react'
import Comments from 'src/assets/Comments'

const CardDone = ({ id, task, totalTasks, setTotalTasks, change, setChange }: any) => {

    const [seeAction, setSeeAction] = useState(false);

    const handleChangeToDo = () => {
        let taskEdit = {
            state: "to do",
            priority: task.priority,
            title: task.title,
            description: task.description,
            coments: task.coments
        }
        setTotalTasks([...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.lenth), taskEdit])
        setChange(!change);
    }

    const handleChangeOnProgress = () => {
        let taskEdit = {
            state: "on progress",
            priority: task.priority,
            title: task.title,
            description: task.description,
            coments: task.coments
        }
        setTotalTasks([...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.lenth), taskEdit])
        setChange(!change);
    }

    return (
        <div className='w-5/6 bg-[#FFFFFF] rounded-2xl border-[1px] h-36 '>
            <div className='flex justify-between pt-5 mx-5'>
                <div className='rounded w-16' style={{ backgroundColor: task.priority === "Low" ? "rgba(223, 168, 116, 0.2)" : task.priority === "High" ? "rgba(216, 114, 125, 0.1)" : "rgba(0, 21, 255, 0.1)" }}>
                    <p className='text-center' style={{ color: task.priority === "Low" ? "#D58D49" : task.priority === "High" ? "#D8727D" : "rgba(0, 21, 255, 1)" }}>{task.priority}</p>
                </div>
                <div onClick={() => {
                    setSeeAction(!seeAction);
                }} className='relative w-5 h-5 rounded-md bg-slate-400 flex justify-center items-center cursor-pointer select-none mr-8'>
                    <p className='text-white text-xl mb-3'>...</p>
                    {<div
                        className={`absolute z-20 opacity-90 left-0 top-5 bg-slate-50 w-24 duration-500 ease-out overflow-hidden border-[1px] rounded ${seeAction ? "h-10" : "h-0  border-0 "
                            }`}
                    >
                        <p className='text-[#5030E5] text-left bg-[#5030e51a] hover:bg-blue-200 font-semibold text-sm' onClick={() => handleChangeToDo()}>To Do</p>
                        <p className='text-[#FFA500] text-left bg-[#ffa50026] hover:bg-amber-200 font-semibold text-sm' onClick={() => handleChangeOnProgress()}>On Progress</p>

                    </div>}
                </div>
            </div>
            <h1 className='text-lg font-semibold font-sans mx-5'>{task.title}</h1>
            <span className='text-xs font-normal font-sans mx-5 text-[#787486]'>{task.description}</span>
            <div className='flex items-center gap-2 mx-5'>
                <Comments />
                <small className='text-[#787486] font-medium font-sans text-xs'>{task.coments} comments</small>
            </div>

        </div>
    )
}

export default CardDone;