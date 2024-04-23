import { useEffect, useState } from 'react';
import 'animate.css';

interface Images {
  backend: string[];
  frontend: string[];
  database: string[];
  CloudTesting: string[];
  DevOps: string[];
}

const Stack = () => {
  const navItems = ['backend', 'frontend', 'database', 'CloudTesting', 'DevOps'] as const;
  const [active, setActive] = useState<typeof navItems[number]>(navItems[0]);

  const images: Images = {
    backend: ['https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/zfa7zxjwvnjqxibqz8ib', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/fcnociio3yjixp5iaook', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/iggffjd91znriqcwesm8', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/gy45tbkffptqi1phonzm', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/xrudv1o9trszbydxsokf', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/dagyy1uom9x7fhtrtalw', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/dc7dkbkfqntonunuw8ka', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/feg6pqv2psos8utxxihf',],
    frontend: ['https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/zfa7zxjwvnjqxibqz8ib', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/thvpnhxfenrmtnxr7myg', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/peb2owbokltfxkjqvo72', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/ji2uufh6fedqwyxfvll0', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/xnhnxura3qqyez8edh2r'],
    database: ['https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/uwjpzcgs6oyq4e93ww7w', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/lb9w4t3gqrog8v3j6i0g', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/af6gb4ephtqj3tjm5diu', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/ppdp5s8bv9yda3i9ns7m'],
    CloudTesting: ['https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/xmiuwgxawz689x9sqlvd', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/jgdeiflrmltiwxfmzwei', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/s8f83u96u1ezwqdktamj'],
    DevOps: ['https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/zhw4i0sqwoihcqhq0ilq', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/drvvvtppfszonyhic2je', 'https://res.cloudinary.com/dkljgkuyy/image/upload/f_auto,q_auto/v1/iris-astro/igfnfefouk8wdn9pik7y'],
  };

  const setActiveItem = (item: typeof navItems[number]) => {
    setActive(item);
    applyAnimationEffect();
  };

  const applyAnimationEffect = () => {
    const element = document.getElementById('sectionImages');
    if (element) {

      element.classList.remove('animate__animated', 'animate__fadeIn', 'animate__slow', 'animate__repeat-1');

      setTimeout(() => {
        element.classList.add('animate__animated', 'animate__fadeIn', 'animate__slow', 'animate__repeat-1');
      }, 0);
    }
  };

  return (
    <div id="herramientas" className="text-center h-auto lg:h-[300px] my-10 lg:my-0 font-poppins">
      <h1 className='text-[35px] font-bold dark:text-stone-100 text-black'>Nuestras</h1>
      <h1 className='text-[35px] font-bold mb-[2rem] dark:text-stone-100 text-black'>Herramientas</h1>

      <div className="mb-[3rem]">
        {navItems.map(item => (
          <button key={item} onClick={() => setActiveItem(item)} className={item === active ? 'text-red-500 mr-[1rem]' : 'mr-[1rem] dark:text-stone-100 text-black'}>
            {item}
          </button>
        ))}
      </div>

      <div id='sectionImages' className="max-w-screen-lg items-center flex flex-wrap mx-auto">
        {images[active].map((image, index) => (
          <img className='text-center mx-auto items-center' key={index} src={image} alt={`${active} Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Stack;
