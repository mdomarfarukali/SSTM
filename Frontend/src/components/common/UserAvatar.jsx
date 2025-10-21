import { useState } from "react";
import avatarImg from "../../assets/avatar.svg"; // Make sure avatar.svg is in src/assets/

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar Image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary hover:scale-105 transition"
      >
        <img
          src={avatarImg}
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-brand-muted z-50">
          <ul className="py-2 text-sm text-brand">
            <li className="px-4 py-2 hover:bg-brand-light cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-brand-light cursor-pointer">
              Orders
            </li>
            <li className="px-4 py-2 hover:bg-brand-light cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-brand-primary text-white font-medium cursor-pointer rounded">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
