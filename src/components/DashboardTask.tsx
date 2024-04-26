import { useEffect, useState } from 'react'
import ToDo from './ToDo'
import OnProgress from './OnProgress'
import Done from './Done'
import Box from 'src/assets/Box'
import List from 'src/assets/List'
import ToDoList from './ToDoList'
import OnProgressList from './OnProgressList'
import DoneLisT from './DoneLisT'
import AddProject from './AddProject'

interface Comments {
    comment: string,
    date: string
}

interface Task {
    state: string,
    priority: string,
    title: string,
    description: string,
    comments: Comments[]
}

interface Project {
    name: string,
    color: string,
    tasks: Task[]
}

const DashboardTask = () => {

    /* const [tasks, setTasks] = useState([{
        state: "to do",
        priority: "Low",
        title: "Responsive Web",
        description: "Falta maquetar bien tal cosa...",
        coments: 9
    },
    {
        state: "to do",
        priority: "Medium",
        title: "Responsive Adra",
        description: "Falta maquetar bien las Cards",
        coments: 15
    },
    {
        state: "to do",
        priority: "High",
        title: "Iris Web",
        description: "Falta agregar un Dashboard de tareas",
        coments: 20
    },
    {
        state: "to do",
        priority: "Medium",
        title: "Corregir Slider",
        description: "Falta el modo responsive",
        coments: 7
    }]); */


    const [change, setChange] = useState(false);
    const [tasksOnProgress, setTaskOnProgress] = useState<Task[]>([]);
    const [tasksToDo, setTaskToDo] = useState<Task[]>([]);
    const [tasksDone, setTaskDone] = useState<Task[]>([]);
    const [idsToDo, setIdsToDo] = useState<number[]>([]);
    const [idsOnProgress, setIdsOnProgress] = useState<number[]>([]);
    const [idsDone, setIdsDone] = useState<number[]>([]);

    const [viewData, setViewData] = useState('box');

    const handleChangeViewData = (value: string) => {
        setViewData(value);
    }

    const [projects, setProjects] = useState<Project[]>([]);
    const [idView, setIdView] = useState(0);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setChange(!change);
    };

    const [valueTasks, setValuesTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (projects.length > 0) {
            setValuesTasks(projects[idView]?.tasks);
            const filteredTasksOnProgress = projects[idView]?.tasks
                .map((task: Task, ix: number) => ({ task, ix }))
                .filter(({ task }) => task.state === 'on progress');

            const filteredDataOnProgress = filteredTasksOnProgress.map(({ task }) => task);
            const filteredIndicesOnProgress = filteredTasksOnProgress.map(({ ix }) => ix);

            setIdsOnProgress(filteredIndicesOnProgress);

            setTaskOnProgress(filteredDataOnProgress);

            const filteredTasksToDo = projects[idView].tasks
                .map((task: Task, ix: number) => ({ task, ix }))
                .filter(({ task }) => task.state === 'to do');

            const filteredDataTodo = filteredTasksToDo.map(({ task }) => task);
            const filteredIndicesTodo = filteredTasksToDo.map(({ ix }) => ix);
            setTaskToDo(filteredDataTodo);
            setIdsToDo(filteredIndicesTodo);

            const filteredTasksDone = projects[idView].tasks
                .map((task: Task, ix: number) => ({ task, ix }))
                .filter(({ task }) => task.state === 'done');

            const filteredDataDone = filteredTasksDone.map(({ task }) => task);
            const filteredIndicesDone = filteredTasksDone.map(({ ix }) => ix);
            setTaskDone(filteredDataDone);
            setIdsDone(filteredIndicesDone);
        }


    }, [change, idView]);

    return (
        <div className='flex'>
            <div className='w-1/6 border-r-2 pr-2'>
                <div className='flex items-center gap-10 ml-5'>
                    <h1 className='text-xs font-bold text-[#787486] font-poppins'>MY PROJECTS</h1>
                    <p className='w-6 h-6 rounded-md border-2 flex justify-center items-center text-lg cursor-pointer font-poppins' onClick={openModal}>+</p>
                </div>
                <hr className='bg-[#DBDBDB] w-4/5 h-[2px] ml-5' />
                <div>
                    <ul>
                        {projects.map((project: Project, ix: number) =>
                            <li key={ix} className='flex items-center ml-5 gap-3 my-2'>
                                <p className='w-2 h-2 rounded-full' style={{ backgroundColor: `${project.color}` }} />
                                <h2 onClick={() => {
                                    setIdView(ix);
                                }} className={`font-poppins font-medium cursor-pointer ${ix === idView ? "bg-slate-200" : ""}  w-full hover:transition-all hover:delay-75 truncate`}>{project.name}</h2>
                            </li>
                        )}
                    </ul>
                </div>
                {isOpenModal && <AddProject closeModal={closeModal} totalProjects={projects} setTotalProjects={setProjects} />}
            </div>
            <div className='w-full'>
                {projects.length > 0 ?
                    <>
                        <div className='flex justify-end mr-16 mb-5'>
                            <div className='flex gap-3'>
                                <div onClick={() => handleChangeViewData('list')} className={`${viewData == 'list' ? "bg-[#5030E5]" : ""} p-2 rounded-md cursor-pointer`}>
                                    <List />
                                </div>
                                <div onClick={() => handleChangeViewData('box')} className={`${viewData == 'box' ? "bg-[#5030E5]" : ""} p-2 rounded-md cursor-pointer`}>
                                    <Box />
                                </div>
                            </div>
                        </div>
                        {viewData == 'box' ?
                            <>
                                <div className='flex flex-col justify-center items-center'>
                                    <h1 className='font-poppins font-semibold text-2xl'>{projects[idView].name}</h1>
                                    <hr className='h-1 w-[70%]' style={{ backgroundColor: `${projects[idView].color}` }} />
                                </div>
                                <div className='grid grid-cols-3 place-items-center mt-3'>
                                    <ToDo
                                        tasks={tasksToDo}
                                        ids={idsToDo}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                    <OnProgress
                                        tasks={tasksOnProgress}
                                        ids={idsOnProgress}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                    <Done
                                        tasks={tasksDone}
                                        ids={idsDone}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                </div>
                            </> : <>
                                <div className='flex flex-col items-center justify-center gap-5'>
                                    <ToDoList
                                        tasks={tasksToDo}
                                        ids={idsToDo}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                    <OnProgressList
                                        tasks={tasksOnProgress}
                                        ids={idsOnProgress}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                    <DoneLisT
                                        tasks={tasksDone}
                                        ids={idsDone}
                                        idProject={idView}
                                        projects={projects}
                                        setProjects={setProjects}
                                        totalTasks={valueTasks}
                                        setTotalTasks={setValuesTasks}
                                        change={change}
                                        setChange={setChange} />
                                </div>
                            </>
                        }</> :
                    <></>
                }

            </div>
        </div>
    )
}

export default DashboardTask;