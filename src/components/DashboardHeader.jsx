import  { useState } from 'react';
import { Bell, User, Camera } from 'lucide-react';

const DashboardHeader = () => {
  const [profileImage, setProfileImage] = useState(null);

  // Handle image upload logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center">
        <span className="text-red-500 font-extrabold text-2xl italic tracking-tighter">
          E-pay
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-10">
        <a onClick={() => window.location.href = "/"}
        className="text-gray-600 hover:text-black font-medium transition-colors cursor-pointer">Home</a>
        <a onClick={() => window.location.href = "/about-us"}
         className="text-gray-600 hover:text-black font-medium transition-colors cursor-pointer" >About</a>
        <a onClick={() => window.location.href = "/contact-us"}
        className="text-gray-600 hover:text-black font-medium transition-colors cursor-pointer">Contact Us</a>
      </nav>

      {/* Action Icons & Profile Upload */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button
        onClick={() => window.location.href = "/dashboard/notification"}
        className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile / Upload Section */}
        <div className="relative group">
          <label htmlFor="profile-upload" className="cursor-pointer block">
            <div className="w-10 h-10 rounded-full border-2 border-red-400 flex items-center justify-center overflow-hidden bg-gray-50 hover:opacity-80 transition-opacity">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-red-400" />
              )}
            </div>
            
            {/* Hover overlay for upload hint */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </label>
          
          <input 
            type="file" 
            id="profile-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;