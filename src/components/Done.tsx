import CardDone from './CardDone'

const Done = ({ tasks, ids, idProject, projects, setProjects, totalTasks, setTotalTasks, change, setChange }: any) => {

    return (
        <div className='bg-[#F5F5F5] rounded-2xl h-[550px] w-[90%] overflow-y-scroll'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5 pl-5 pt-5 mb-5'>
                    <p className='w-2 h-2 bg-[#57c055] rounded-full flex justify-center items-center'></p>
                    <h1 className='font-medium font-poppins'>Done</h1>
                    <p className='w-5 h-5 rounded-full bg-[#E0E0E0] flex justify-center items-center text-[#625F6D] font-poppins'>{tasks.length}</p>
                </div>
            </div>
            <hr className='ml-5 h-[3px] bg-[#57c055] w-5/6' />
            <div className='flex flex-col items-center gap-5 mt-5'>
                {tasks.map((task: any, ix: number) =>
                (
                    <CardDone key={ix} id={ids[ix]} idProject={idProject} projects={projects} setProjects={setProjects} task={task} totalTasks={totalTasks} change={change} setChange={setChange} setTotalTasks={setTotalTasks} />
                )
                )}</div>
        </div >
    )
}
export default Done