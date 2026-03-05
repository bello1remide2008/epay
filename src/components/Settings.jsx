import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GoBackButton from "./GoBackButton";
import {  Bell } from "lucide-react";
import MobileNav from "./MobileNav";
import {
  FaUser,
  FaUniversity,
  FaLock,
  FaGift,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "User",
    phone: "",
    image: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const settingsItems = [
    {
      title: "Personal Information",
      subtitle: "KYC & Profile details",
      icon: <FaUser className="text-gray-700" />,
      action: () => navigate("/dashboard/personal-information"),
    },
    {
      title: "Banks & Cards",
      subtitle: "Manage your payment methods",
      icon: <FaUniversity className="text-gray-700" />,
      action: () => navigate("/dashboard/bank-cards"),
    },
    {
      title: "Security",
      subtitle: "PIN, biometrics & more",
      icon: <FaLock className="text-gray-700" />,
      action: () => navigate("/dashboard/security"),
    },
    {
      title: "Referral",
      subtitle: "Earn money by inviting friends",
      icon: <FaGift className="text-gray-700" />,
      action: () => navigate("/dashboard/referral"),
    },
    {
      title: "Notifications",
      subtitle: "Manage your alerts",
      icon: <FaBell className="text-gray-700" />,
      action: () => navigate("/dashboard/notification"),
    },
    {
      title: "Help & Support",
      subtitle: "Get help when you need it",
      icon: <FaQuestionCircle className="text-gray-700" />,
      action: () => navigate("/dashboard/help-support"),
    },
  ];

  return (
    <div className="p-4">
      <GoBackButton />
      <h2 className="text-lg font-bold mb-4">Settings</h2>
{/* 🔔 Notification Icon */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/dashboard/notifications")}
          className="bg-white p-2 rounded-full shadow"
        >
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      {/* Profile Card */}
      <div className="bg-black text-white rounded-2xl p-4 flex items-center gap-4 mb-6">
        <img
          src={user.image || "https://via.placeholder.com/60"}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-300">{user.phone}</p>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg shadow"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="text-xl">{item.icon}</div>

              <div className="text-left">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>

            {/* Arrow */}
            <span className="text-gray-400 text-lg">›</span>
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="w-full flex items-center justify-between p-3 bg-red-50 text-red-500 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <FaSignOutAlt />
            <div className="text-left">
              <p className="text-sm font-semibold">Logout</p>
              <p className="text-xs">Sign out of your account</p>
            </div>
          </div>

          <span className="text-red-400 text-lg">›</span>
        </button>
      </div>
      <MobileNav />
    </div>
  );
};

export default Settings;

