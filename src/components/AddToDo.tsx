import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

const AddToDo = ({ closeModal, idProject, projects, setProjects, totalTasks, setTotalTasks }: any) => {

    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const [datos, setDatos] = useState({
        state: "to do",
        priority: '',
        title: '',
        description: '',
        comments: []
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const newTasks = [...projects[idProject].tasks, { ...datos }];
        try {
            const response = await fetch(`http://localhost:5000/api/projects/${projects[idProject]._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tasks: newTasks }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            console.log('Task updated successfully');
            // Realizar acciones adicionales si es necesario, como actualizar el estado de la aplicación.
        } catch (error) {
            console.error('Error updating task:', error);
        }

        closeModal();
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
                ref={modalRef}
                className="bg-gray-200 w-3/4 mx-5 h-[85%] p-4 rounded-[75px]"
            >
                <div className='flex justify-center items-center gap-5 mt-20'>
                    <p className='w-2 h-2 bg-[#5030E5] rounded-full flex justify-center items-center' />
                    <h1 className='text-center text-2xl font-semibold font-poppins'>Add new task</h1>
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg mt-10">
                    <div>
                        <label className="block mb-2 font-poppins">Priority:</label>
                        <select
                            required
                            name='priority'
                            onChange={handleChangeSelect}
                            className="appearance-none text-center font-poppins bg-gray-300 text-black font-semibold w-1/3 sm:w-full max-w-xs ml-3 sm:ml-0"
                        >
                            <option value={""} selected disabled>
                                Select Priority
                            </option>
                            <option
                                value={"Low"} >Low</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"High"}>High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-poppins">Title:</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={datos.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-poppins">Description :</label>
                        <input
                            required
                            type="text"
                            name="description"
                            value={datos.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 font-poppins">Create Task</button>
                </form>
            </div>
        </div>
    )
}

export default AddToDo