import { useEffect, useRef, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ModalAlert from './ModalAlert';


const InfoTask = ({ closeModal, id, priority, change, setChange, name, state, description, idProject, setProjects, comments, projects }: any) => {

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



    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: [] }],
            [{ color: [] }],
            ["code-block"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "align",
        "color",
        "code-block",
    ];

    const [content, setContent] = useState('');

    const handleEditorChange = (value: any) => {
        setContent(value);
    };

    const [QuillEditor, setQuillEditor] = useState<any>(null);

    useEffect(() => {
        const loadQuillEditor = async () => {
            const module = await import('react-quill');
            setQuillEditor(() => module.default);
        };

        loadQuillEditor();
    }, []);

    const fechaActual = new Date();
    const opciones = { timeZone: 'America/Lima' };
    const fechaHoraLima = fechaActual.toLocaleString('es-PE', opciones);

    const sendData = async () => {
        if (content !== '') {
            const taskUpdate = [
                ...projects[idProject].tasks.slice(0, id),
                { ...projects[idProject].tasks[id], comments: [...comments, { comment: content, date: fechaHoraLima }] },
                ...projects[idProject].tasks.slice(id + 1, projects[idProject].tasks.length)
            ];
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

                // Después de enviar la solicitud PUT, vuelve a cargar los proyectos
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
                    setContent('');
                });

            } catch (error) {
            }
        } else {
            openModalAlert();
        }
    };


    const exitInfo = () => {
        closeModal();
    }

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const openModalAlert = () => {
        setIsOpenAlert(true);
    };

    const closeModalAlert = () => {
        setIsOpenAlert(false);
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div
                    ref={modalRef}
                    className="bg-gray-100 w-[90%] mx-5 h-[90%] p-4 rounded-[30px]"
                >
                    <div className='grid grid-cols-3'>
                        <div className='mx-2 col-span-2'>
                            <h1 className='text-center text-2xl font-bold font-poppins tracking-wide'>Task: {name}</h1>
                            <p className='text-left font-poppins font-semibold'>Description:</p>
                            <p className='text-left font-poppins py-3'>{description}</p>
                            <br />
                            <small className='font-poppins tracking-wide font-medium'>Add comment</small>
                            <div className='sm:h-[320px] xl:h-[295px] bg-white'>
                                {QuillEditor &&
                                    <QuillEditor
                                        modules={quillModules}
                                        formats={quillFormats}
                                        value={content}
                                        onChange={handleEditorChange}
                                        className="w-full h-[250px]"
                                    />
                                }
                            </div>
                            <div className='flex justify-end gap-5'>
                                <button onClick={exitInfo} className='bg-green-400 rounded w-20 h-8 text-slate-100 font-poppins text-lg'>Exit</button>
                                <button onClick={sendData} className='bg-sky-600 rounded w-20 h-8 text-slate-100 font-poppins text-lg'>Send</button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center col-span-1'>
                            <div className='flex items-center gap-2 my-2'>
                                <p className='text-base font-medium font-poppins'>State Task: </p>
                                <p className='text-xl font-semibold font-poppins'>{state.toUpperCase()}</p>
                            </div>
                            <div className='rounded w-16' style={{ backgroundColor: priority === "Low" ? "rgba(223, 168, 116, 0.2)" : priority === "High" ? "rgba(216, 114, 125, 0.1)" : "rgba(0, 21, 255, 0.1)" }}>
                                <p className='text-center font-poppins' style={{ color: priority === "Low" ? "#D58D49" : priority === "High" ? "#D8727D" : "rgba(0, 21, 255, 1)" }}>{priority}</p>
                            </div>
                            <div className='border-[1px] border-gray-300 h-[500px] w-full mt-5 shadow-sm overflow-y-scroll'>
                                {comments.map((comment: any, id: number) => (
                                    <div key={id} className='mt-3'>
                                        <p className='font-poppins text-xs ml-2'>Date: {comment.date}</p>
                                        <div className='flex gap-2 mx-2 bg-stone-200 rounded border-2 border-gray-500'>
                                            <div className='text-black font-poppins text-left' style={{ maxWidth: '100%', overflowY: 'auto', wordWrap: 'break-word' }}>
                                                <p dangerouslySetInnerHTML={{ __html: comment.comment }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    {isOpenAlert && <ModalAlert closeModalAlert={closeModalAlert} />}
                </div>
            </div >
        </>
    )
}

export default InfoTask