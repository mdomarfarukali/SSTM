import { useState } from "react";
import avatarImg from "../../assets/avatar.svg                                                                                                                                                  "; // 👈 put avatar.jpg inside src/assets/

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar Image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500 hover:scale-105 transition"
      >
        <img
          src={avatarImg}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-50">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-700 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-700 cursor-pointer">
              Orders
            </li>
            <li className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-700 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-pink-100 text-pink-600 font-medium dark:hover:bg-gray-700 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

