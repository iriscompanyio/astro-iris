import { useState } from "react";

const Socials = () => {
  const socials = [
    {
      name: "Instagram",
      image: "instagram-clouds.svg",
      icon: "instagram.svg",
      message:
        "“Conéctate con nosotros para enterarte de nuestros contenidos y proyectos”",
      user: "iriscompany.io",
      href: "https://www.instagram.com/iriscompany.io/",
    },
    {
      name: "Discord",
      image: "discord-clouds.svg",
      icon: "discord.svg",
      message:
        "“Únete a nuestra comunidad en Discord  para conversaciones en tiempo real y una experiencia más iteractiva”",
      user: "Iris Company",
      href: "https://discord.gg/yKBVyBvqDy",
    },
    {
      name: "Linkedin",
      image: "linkedin-clouds.svg",
      icon: "linkedin.svg",
      message:
        "“Conéctate para acceder contenido profesional de la empresa y oportunidades de networking“",
      user: "Iris Company",
      href: "https://www.linkedin.com/company/iriscompanyio/",
    },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <div id="redes" className="flex flex-col items-center dark:bg-dark w-full p-[2%] mt-14 space-y-[5%] font-poppins">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[20px] md:text-[40px] text-[#2E526B] dark:text-white">
          Seguinos en nuestras redes
        </p>
        <div className="bg-[#5752DA] h-1 w-[84px] mt-4 mb-6"></div>
        <div className="flex space-x-2 md:space-x-6">
          {socials.map((social, index) => (
            <div className="flex flex-col" key={index}>
              <button
                onClick={() => setSelected(index)}
                className={`text-black dark:text-stone-100 text-xs md:text-[21px] border-2 border-[#688297] rounded-full md:rounded-2xl px-5 py-2 md:px-10 md:py-4 transition duration-500 hover:bg-[#4646FA] hover:border-[#4646FA] hover:text-white uppercase ${selected === index &&
                  "bg-[#4646FA] text-white !border-[#4646FA]"
                  }`}
              >
                {social.name}
              </button>
              {selected === index && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  className="mt-1"
                >
                  <path
                    d="M7.15773 11.184L0.984994 1.53905C0.559005 0.873446 1.03701 0 1.82727 0H14.1727C14.963 0 15.441 0.873446 15.015 1.53905L8.84227 11.184C8.44893 11.7985 7.55107 11.7985 7.15773 11.184Z"
                    fill="#4646FA"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden w-full items-center pb-2">
        {socials.map((social, index) => (
          <div
            className={`flex flex-col space-y-8 md:space-y-0 items-center md:flex-row md:space-x-[3%] w-full shrink-0 duration-500 ${selected === 0
              ? "-translate-x-0"
              : selected === 1
                ? "-translate-x-[100%]"
                : "-translate-x-[200%]"
              }`}
            key={index}
          >
            <div className="w-[80%] sm:w-[60%] md:min-w-[40%]">
              <img src={social.image} alt="" />
            </div>
            <div className="w-[90%] md:w-auto flex flex-col justify-center space-y-8 md:space-y-12">
              <p className="font-extrabold text-[16px] md:text-[21px] lg:text-[35px] text-center text-black dark:text-stone-100">
                {social.message}
              </p>
              <a
                href={social.href}
                target="_blank"
                className="flex justify-center space-x-2 items-center"
              >
                <div className="w-[24px] md:w-[42px]">
                  <img src={social.icon} alt="" />
                </div>
                <p className="font-extrabold text-[16px] md:text-[21px] text-black dark:text-stone-100">
                  {social.user}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socials;
