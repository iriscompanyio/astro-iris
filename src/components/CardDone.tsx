import { useEffect, useRef, useState } from 'react'
import Comments from 'src/assets/Comments'
import InfoTask from './InfoTask';

interface CommentsType {
    comment: string,
    date: string
}

const CardDone = ({ id, idProject, projects, setProjects, task, totalTasks, change, setChange, setTotalTasks }: any) => {

    const [seeAction, setSeeAction] = useState(false);

    const handleChangeToDo = async () => {

        const taskUpdate = [...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.length), { ...totalTasks[id], state: 'to do' }];

        try {
            const response = await fetch(`http://localhost:5000/api/projects/${projects[idProject]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks: taskUpdate }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const fetchTasks = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/projects');
                    if (!response.ok) {
                        throw new Error('Failed to fetch projects');
                    }
                    const projects = await response.json();
                    return projects; // Retornamos los proyectos para usarlos en el efecto posterior
                } catch (error) {
                    return null; // En caso de error, retornamos null
                }
            };
            fetchTasks().then((data) => {
                setProjects(data);
                setChange(!change);
            });
        } catch (error) {
        }
    }

    const handleChangeOnProgress = async () => {

        const taskUpdate = [...totalTasks.slice(0, id), ...totalTasks.slice(id + 1, totalTasks.length), { ...totalTasks[id], state: 'on progress' }];
        try {
            const response = await fetch(`http://localhost:5000/api/projects/${projects[idProject]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks: taskUpdate }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const fetchTasks = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/projects');
                    if (!response.ok) {
                        throw new Error('Failed to fetch projects');
                    }
                    const projects = await response.json();
                    return projects; // Retornamos los proyectos para usarlos en el efecto posterior
                } catch (error) {
                    return null; // En caso de error, retornamos null
                }
            };
            fetchTasks().then((data) => {
                setProjects(data)
                setChange(!change);
            });
        } catch (error) {
        }

    }

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setSeeAction(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <div className='w-5/6 bg-[#FFFFFF] rounded-2xl border-[1px] h-36 '>
                <div className='flex justify-between pt-5 mx-5'>
                    <div className='rounded w-16' style={{ backgroundColor: task.priority === "Low" ? "rgba(223, 168, 116, 0.2)" : task.priority === "High" ? "rgba(216, 114, 125, 0.1)" : "rgba(0, 21, 255, 0.1)" }}>
                        <p className='text-center font-poppins' style={{ color: task.priority === "Low" ? "#D58D49" : task.priority === "High" ? "#D8727D" : "rgba(0, 21, 255, 1)" }}>{task.priority}</p>
                    </div>
                    <div ref={modalRef} onClick={() => {
                        setSeeAction(!seeAction);
                    }} className='relative w-5 h-5 rounded-md bg-slate-400 flex justify-center items-center cursor-pointer select-none mr-8'>
                        <p className='text-white text-xl mb-3 font-poppins'>...</p>
                        {<div
                            className={`absolute z-20 opacity-90 left-0 top-5 bg-slate-50 w-24 duration-500 ease-out overflow-hidden border-[1px] rounded ${seeAction ? "h-10" : "h-0  border-0 "
                                }`}
                        >
                            <p className='text-[#5030E5] text-left bg-[#5030e51a] hover:bg-blue-200 font-semibold text-sm font-poppins' onClick={() => handleChangeToDo()}>To Do</p>
                            <p className='text-[#FFA500] text-left bg-[#ffa50026] hover:bg-amber-200 font-semibold text-sm font-poppins' onClick={() => handleChangeOnProgress()}>On Progress</p>

                        </div>}
                    </div>
                </div>
                <div className='cursor-pointer' onClick={openModal}>
                    <h1 className='text-lg font-semibold font-poppins mx-5 w-4/5 truncate'>{task.title}</h1>
                    <p className='text-xs font-normal font-poppins mx-5 text-[#787486] truncate'>{task.description}</p>
                    <div className='flex items-center gap-2 mx-5'>
                        <Comments />
                        <small className='text-[#787486] font-medium font-poppins text-xs'>{projects[idProject].tasks[id]?.comments.length} comments</small>
                    </div>
                </div>
            </div>
            {isOpenModal && <InfoTask closeModal={closeModal} change={change} setChange={setChange} id={id} idProject={idProject} state={task.state} priority={task.priority} name={task.title} description={task.description} setProjects={setProjects} totalTasks={totalTasks} comments={projects[idProject].tasks[id]?.comments} projects={projects} />}
        </>
    )
}

export default CardDone;