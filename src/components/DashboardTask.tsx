import { useEffect, useState } from 'react'
import ToDo from './ToDo'
import OnProgress from './OnProgress'
import Done from './Done'

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


    return (
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
    )
}

export default DashboardTask;