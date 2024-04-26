import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

interface Task {
    state: string,
    priority: string,
    title: string,
    description: string,
    coments: number
}

const AddProject = ({ closeModal, totalProjects, setTotalProjects }: any) => {
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

    const [colorValue, setColorValue] = useColor("#561ecb");

    const [name, setName] = useState('');
    const tasks: Task[] = [];

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newProjectData = {
            name: name,
            color: colorValue.hex,
            tasks: tasks
        };

        try {
            const response = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProjectData),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const newProject = await response.json();
        } catch (error) {
            console.error('Error creating project:', error);
        }
        //setTotalProjects([...totalProjects, newProjectData]);
        closeModal();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
                ref={modalRef}
                className="bg-gray-200 w-3/4 mx-5 h-[85%] p-4 rounded-[75px]"
            >
                <div className='flex justify-center items-center gap-5 mt-2'>
                    <p style={{ backgroundColor: `${colorValue.hex}` }} className={`w-2 h-2 rounded-full flex justify-center items-center`} />
                    <h1 className='text-center font-poppins text-2xl font-semibold'>Add new project</h1>
                </div>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg mt-2">
                    <div>
                        <label className="block mb-2 font-poppins">Name:</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-poppins">Color :</label>
                        <ColorPicker height={60} color={colorValue} onChange={setColorValue} />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 font-poppins">Create Project</button>
                </form>
            </div>
        </div>
    )
}

export default AddProject;
