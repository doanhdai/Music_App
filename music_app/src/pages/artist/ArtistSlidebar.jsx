import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeLinkStyled = "hover:bg-[#6a6a6a]";
  const normalLinkStyled = "hover:bg-[#6a6a6a]";

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ">
      <div className="h-[15%] rounded flex flex-col justify-around pl-8">
        <Link to="/" className="m-0 p-0 no-underline">
          <img src="./src/assets/logo1.svg" className="w-[20%] " />
        </Link>
      </div>

      <div className="bg-[#121212] font-bold h-[85%] rounded flex flex-col p-5 gap-5 ">
        <NavLink
          to="/artist-site/song"
          className={({ isActive }) =>
            isActive ? activeLinkStyled : normalLinkStyled
          }
        >
          <div className="flex items-center gap-5 p-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6  dark:text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>

            <span>Song</span>
          </div>
        </NavLink>
        <NavLink
          to="/artist-site/album"
          className={({ isActive }) =>
            isActive ? activeLinkStyled : normalLinkStyled
          }
        >
          <div className="flex items-center gap-5 p-3">
            <svg
              className="w-6 h-6  dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M17.316 4.052a.99.99 0 0 0-.9.14c-.262.19-.416.495-.416.82v8.566a4.573 4.573 0 0 0-2-.464c-1.99 0-4 1.342-4 3.443 0 2.1 2.01 3.443 4 3.443 1.99 0 4-1.342 4-3.443V6.801c.538.5 1 1.219 1 2.262 0 .56.448 1.013 1 1.013s1-.453 1-1.013c0-1.905-.956-3.18-1.86-3.942a6.391 6.391 0 0 0-1.636-.998 4 4 0 0 0-.166-.063l-.013-.005-.005-.002h-.002l-.002-.001ZM4 5.012c-.552 0-1 .454-1 1.013 0 .56.448 1.013 1 1.013h9c.552 0 1-.453 1-1.013 0-.559-.448-1.012-1-1.012H4Zm0 4.051c-.552 0-1 .454-1 1.013 0 .56.448 1.013 1 1.013h9c.552 0 1-.454 1-1.013 0-.56-.448-1.013-1-1.013H4Zm0 4.05c-.552 0-1 .454-1 1.014 0 .559.448 1.012 1 1.012h4c.552 0 1-.453 1-1.012 0-.56-.448-1.013-1-1.013H4Z"
                clipRule="evenodd"
              />
            </svg>

            <span>Album</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
