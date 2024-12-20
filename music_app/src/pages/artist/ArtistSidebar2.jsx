import { startTransition, useState, useEffect, useContext } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { assets } from '../../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiAlbumLine } from "react-icons/ri";
import { MdOutlineQueueMusic } from "react-icons/md";
import { PiMoney } from "react-icons/pi";
import { PiChartLineUpLight } from "react-icons/pi";
import { PlayerContext } from '../../context/PlayerContext';
const menuItems = [
  { label: 'Bài hát', icon: <RiAlbumLine size={20} />, route: '/artist-site', id: 'song' },
  { label: 'Album', icon: <MdOutlineQueueMusic size={20} />, route: '/artist-site/album', id: 'album' },
  { label: 'Rút tiền', icon: <PiMoney size={20} />, route: '/artist-site/widthdrawal', id: 'widthdraw' },
  { label: 'Thống kê', icon: <PiChartLineUpLight size={20} />, route: '/artist-site/statistic', id: 'statistic' },
];
const ArtistSidebar2 = () => {
  // State để lưu trữ menuItem đang được active
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const { account } = useContext(PlayerContext);
  // Set trạng thái active dựa vào location pathname
  useEffect(() => {
    const currentItem = menuItems.find(item => item.route === location.pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [location.pathname]);

  const handleMenuItemClick = (id, route) => {
    setActiveItem(id);
    navigate(route);
  };
  return (
    <Sidebar
      width="20%"
      backgroundColor="#121212"
      style={{ border: 'none' }}
      margin="10px"
      className="w-[24%] h-auto m-2 rounded p-2 flex-col gap-2 text-white hidden lg:flex !bg-[#121212] !sticky"
    >

      <abbr title='Nhấn để về trang chủ' className='py-3 flex justify-center '>
        <img src={account.avatar} className='rounded-full w-[65%] h-auto shadow-inner cursor-pointer'
          onClick={() => {
            startTransition(() => {
              navigate('/');
            });
          }}
        />
      </abbr>


      <Menu
        className="flex w-full flex-col self-stretch mt-5"
        menuItemStyles={{
          button: {
            padding: '10px',
            gap: '11px',
            color: '#ffff',
            fontWeight: 450,
            fontSize: '18px',
            borderColor: 'transparent',
            borderLeftWidth: '5px',
            borderStyle: 'solid',
            borderRadius: '0px 15px 15px 0px',
            '&:hover, &.ps-active': {
              color: '#E0066F',
              fontWeight: 700,
              borderColor: '#E0066F',
              backgroundColor: '#000000',
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            onClick={() => handleMenuItemClick(item.id, item.route)}
            style={{
              gap: '0',
              ...(activeItem === item.id && {
                color: '#E0066F',
                backgroundColor: '#000000',
                borderColor: '#E0066F',
                fontWeight: 700,
              }),
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ArtistSidebar2;