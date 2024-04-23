import CardDoneList from './CardDoneList';

const DoneLisT = ({ tasks, ids, idProject, setProjects, totalTasks, change, setChange }: any) => {

    return (
        <div className='bg-[#F5F5F5] rounded-2xl w-5/6 pb-3'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5 pl-5 pt-5 mb-5'>
                    <p className='w-2 h-2 bg-[#57c055] rounded-full flex justify-center items-center'></p>
                    <h1 className='font-medium font-serif'>Done</h1>
                    <p className='w-5 h-5 rounded-full bg-[#E0E0E0] flex justify-center items-center text-[#625F6D]'>{tasks.length}</p>
                </div>
            </div>
            <hr className='ml-5 h-[3px] bg-[#57c055] w-[95%]' />
            <div className='flex flex-col items-center gap-3 mt-5'>
                {tasks.map((task: any, ix: number) =>
                (
                    <CardDoneList key={ix} id={ids[ix]} idProject={idProject} setProjects={setProjects} task={task} totalTasks={totalTasks} change={change} setChange={setChange} />
                )
                )}
            </div>
        </div >
    )
}

export default DoneLisT;