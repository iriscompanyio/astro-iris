const ModalAlert = ({ closeModalAlert }: any) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
                className="bg-orange-300 w-1/2 mx-5 h-[30%] p-4 rounded-[75px]"
            >
                <div className='flex flex-col justify-center items-center gap-5 mt-10'>
                    <p className='text-2xl font-semibold font-poppins'>!No has escrito ningún comentario¡</p>
                    <p className='text-lg font-medium font-poppins'>Por favor llena el cuadro de texto</p>
                </div>
                <div className="flex items-center justify-center mt-5">
                    <button className="bg-orange-400 text-white font-poppins text-lg w-14 rounded-md" onClick={closeModalAlert}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ModalAlert