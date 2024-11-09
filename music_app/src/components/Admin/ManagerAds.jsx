import React, { Suspense, useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const pages = [
  { name: 'Thông tin', path: '/admin/Manager_ads' }, // Đường dẫn tương đối
  { name: 'Hợp đồng', path: '/admin/Manager_ads/contract' }, // Đường dẫn tương đối
];



function ManagerAds() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    const currentItem = pages.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname]);

  function Menu() {
    return (
      <div className='flex mb-5'>
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={`p-2 mr-2 block w-fit ${page.name === activeItem ? 'bg-[#EB2272] text-[#141414] font-bold' : 'bg-[#141414] text-[#A4A298] font-normal'}`}

          >
            {page.name}
          </Link>
        ))}
      </div>
    );
  }
  return (
    <div className='w-full h-full bg-black p-2 pt-5'>
      <Menu />
      <Suspense
        fallback={
          <div className="h-screen bg-black text-white flex justify-center items-center">
            Loading...
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}


export default ManagerAds;