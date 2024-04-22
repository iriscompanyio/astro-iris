import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

const AddToDo = ({ closeModal, totalTasks, setTotalTasks }: any) => {

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
        coments: 0
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTotalTasks([...totalTasks, datos]);
        // Aquí puedes hacer lo que quieras con los datos
        console.log(datos);
        closeModal();
        // Por ejemplo, podrías enviar los datos a través de una solicitud HTTP
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
                ref={modalRef}
                className="bg-gray-200 w-3/4 mx-5 h-[85%] p-4 rounded-[75px]"
            >
                <div className='flex justify-center items-center gap-5 mt-20'>
                    <p className='w-2 h-2 bg-[#5030E5] rounded-full flex justify-center items-center' />
                    <h1 className='text-center font-sans text-2xl font-semibold'>Add new task</h1>
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg mt-10">
                    <div>
                        <label className="block mb-2">Priority:</label>
                        <select
                            name='priority'
                            onChange={handleChangeSelect}
                            className="appearance-none text-center bg-gray-300 text-black font-semibold w-1/3 sm:w-full max-w-xs ml-3 sm:ml-0"
                        >
                            <option value={""} selected disabled>
                                Select Priority
                            </option>
                            <option
                                value={"Low"} className=''>Low</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"High"}>High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={datos.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description :</label>
                        <input
                            type="text"
                            name="description"
                            value={datos.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Create Task</button>
                </form>
            </div>
        </div>
    )
}

export default AddToDo