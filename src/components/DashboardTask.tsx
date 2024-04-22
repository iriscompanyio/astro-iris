import { useEffect, useState } from 'react'
import ToDo from './ToDo'
import OnProgress from './OnProgress'
import Done from './Done'
import Box from 'src/assets/Box'
import List from 'src/assets/List'
import ToDoList from './ToDoList'
import OnProgressList from './OnProgressList'
import DoneLisT from './DoneLisT'

interface Task {
    state: string,
    priority: string,
    title: string,
    description: string,
    coments: number
}

const DashboardTask = () => {

    const [tasks, setTasks] = useState([{
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
    }]);

    const [change, setChange] = useState(false);
    const [tasksOnProgress, setTaskOnProgress] = useState<Task[]>([]);
    const [tasksToDo, setTaskToDo] = useState<Task[]>([]);
    const [tasksDone, setTaskDone] = useState<Task[]>([]);
    const [idsToDo, setIdsToDo] = useState<number[]>([]);
    const [idsOnProgress, setIdsOnProgress] = useState<number[]>([]);
    const [idsDone, setIdsDone] = useState<number[]>([]);

    useEffect(() => {

        const filteredTasksOnProgress = tasks
            .map((task: any, ix: number) => ({ task, ix }))
            .filter(({ task }) => task.state === 'on progress');

        const filteredDataOnProgress = filteredTasksOnProgress.map(({ task }) => task);
        const filteredIndicesOnProgress = filteredTasksOnProgress.map(({ ix }) => ix);

        setIdsOnProgress(filteredIndicesOnProgress);

        setTaskOnProgress(filteredDataOnProgress);

        const filteredTasksToDo = tasks
            .map((task: any, ix: number) => ({ task, ix }))
            .filter(({ task }) => task.state === 'to do');

        const filteredDataTodo = filteredTasksToDo.map(({ task }) => task);
        const filteredIndicesTodo = filteredTasksToDo.map(({ ix }) => ix);
        setTaskToDo(filteredDataTodo);
        setIdsToDo(filteredIndicesTodo);

        const filteredTasksDone = tasks
            .map((task: any, ix: number) => ({ task, ix }))
            .filter(({ task }) => task.state === 'done');

        const filteredDataDone = filteredTasksDone.map(({ task }) => task);
        const filteredIndicesDone = filteredTasksDone.map(({ ix }) => ix);
        setTaskDone(filteredDataDone);
        setIdsDone(filteredIndicesDone);
    }, [change])

    const [viewData, setViewData] = useState('box');

    const handleChangeViewData = (value: string) => {
        setViewData(value);
    }

    return (
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
                    <div className='grid grid-cols-3 place-items-center'>
                        <ToDo tasks={tasksToDo}
                            ids={idsToDo}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                        <OnProgress tasks={tasksOnProgress}
                            ids={idsOnProgress}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                        <Done tasks={tasksDone}
                            ids={idsDone}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                    </div>
                </> : <>
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <ToDoList tasks={tasksToDo}
                            ids={idsToDo}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                        <OnProgressList tasks={tasksOnProgress}
                            ids={idsOnProgress}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                        <DoneLisT tasks={tasksDone}
                            ids={idsDone}
                            totalTasks={tasks}
                            setTotalTasks={setTasks}
                            change={change}
                            setChange={setChange} />
                    </div>
                </>
            }

        </>
    )
}

export default DashboardTask;