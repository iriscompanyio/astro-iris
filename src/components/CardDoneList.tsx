import { useState } from "react";
import Comments from "src/assets/Comments";

const CardDoneList = ({ id, idProject, setProjects, task, totalTasks, change, setChange }: any) => {

    const [seeAction, setSeeAction] = useState(false);

    const handleChangeToDo = () => {
        setProjects((prevProjects: any) => [
            ...prevProjects.slice(0, idProject),
            { ...prevProjects[idProject], tasks: [...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.length), { ...totalTasks[id], state: 'to do' }] },
            ...prevProjects.slice(idProject + 1)
        ]);
        setChange(!change);
    }

    const handleChangeOnProgress = () => {
        setProjects((prevProjects: any) => [
            ...prevProjects.slice(0, idProject),
            { ...prevProjects[idProject], tasks: [...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.length), { ...totalTasks[id], state: 'on progress' }] },
            ...prevProjects.slice(idProject + 1)
        ]);
        setChange(!change);
    }

    return (
        <div className='w-[95%] bg-[#FFFFFF] rounded-2xl border-[1px] h-10 flex justify-between items-center opacity-90'>
            <div className="flex justify-around items-center w-full">
                <div className='rounded w-16' style={{ backgroundColor: task.priority === "Low" ? "rgba(223, 168, 116, 0.2)" : task.priority === "High" ? "rgba(216, 114, 125, 0.1)" : "rgba(0, 21, 255, 0.1)" }}>
                    <p className='text-center font-poppins' style={{ color: task.priority === "Low" ? "#D58D49" : task.priority === "High" ? "#D8727D" : "rgba(0, 21, 255, 1)" }}>{task.priority}</p>
                </div>
                <h1 className='text-lg font-semibold font-poppins w-36 truncate'>{task.title}</h1>
                <span className='text-xs font-normal font-poppins text-[#787486] truncate w-36'>{task.description}</span>
                <div className='flex items-center gap-2 w-36'>
                    <Comments />
                    <small className='text-[#787486] font-medium font-poppins text-xs'>{task.coments} comments</small>
                </div>
            </div>
            <div className='mr-5'>
                <div onClick={() => {
                    setSeeAction(!seeAction);
                }} className='relative w-5 h-5 rounded-md bg-slate-400 flex justify-center items-center cursor-pointer select-none mr-8'>
                    <p className='text-white text-xl mb-3 font-poppins'>...</p>
                    {<div
                        className={`absolute z-20 opacity-90 left-5 top-0 bg-slate-50 w-24 duration-500 ease-out overflow-hidden border-[1px] rounded ${seeAction ? "h-10" : "h-0  border-0 "
                            }`}
                    >
                        <p className='text-[#5030E5] text-left bg-[#5030e51a] hover:bg-blue-200 font-semibold text-sm font-poppins' onClick={() => handleChangeToDo()}>To Do</p>
                        <p className='text-[#FFA500] text-left bg-[#8bc48a26] hover:bg-amber-200 font-semibold text-sm font-poppins' onClick={() => handleChangeOnProgress()}>On Progress</p>

                    </div>}
                </div>
            </div>


        </div>
    )
}


export default CardDoneList;