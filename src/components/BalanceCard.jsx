import { FaEye, FaEyeSlash, FaShareAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BalanceCard = ({ userName = "User" }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [accountDetails, setAccountDetails] = useState([]);
  const navigate = useNavigate();

  const toggleBalance = () => setShowBalance(!showBalance);

  useEffect(() => {
    // Load accounts from localStorage
    const savedAccounts = JSON.parse(localStorage.getItem("accountDetails")) || [];
    setAccountDetails(savedAccounts);
  }, []);

  const maskAccount = (acc) =>
    acc ? `${"*".repeat(acc.length - 4)}${acc.slice(-4)}` : "";

  const handleCopy = (accNumber) => {
    if (!accNumber) return;
    navigator.clipboard.writeText(accNumber);
    alert("Account number copied!");
  };

  const handleShare = (accNumber) => {
    if (!accNumber) return;
    if (navigator.share) {
      navigator.share({
        title: "My Epay Account",
        text: `Send money to ${accNumber}`,
      });
    } else {
      alert("Sharing not supported");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0D1537] to-[#253C9D] text-white rounded-2xl p-6 mb-6">
      <div className="text-center mb-4">
        <p className="text-sm opacity-60">Welcome back</p>
        <h1 className="text-xl font-bold">{userName} 👋</h1>
      </div>

      <p className="text-sm opacity-80">Total Balance</p>
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-3xl font-bold">
          {showBalance
            ? `₦${accountDetails.reduce((sum, acc) => sum + (acc.balance || 0), 0).toLocaleString()}`
            : "********"}
        </h2>
        <div className="flex flex-col items-end">
          <button onClick={toggleBalance} className="text-white text-xl mb-2">
            {showBalance ? <FaEye /> : <FaEyeSlash />}
          </button>
          <button
            onClick={() => navigate("/dashboard/transaction-history")}
            className="text-sm text-white underline"
          >
            Transaction History
          </button>
        </div>
      </div>

      <div className="mt-6">
        {accountDetails.length === 0 ? (
          <p className="text-gray-500 text-sm">No connected accounts yet</p>
        ) : (
          accountDetails.map((acc, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md max-w-md mb-4 text-gray-800"
            >
              <p className="text-lg mb-2">
                <strong>Bank:</strong> {acc.bankName}
              </p>

              <p className="text-lg">
                <strong>Account Number:</strong> {maskAccount(acc.accountNumber)}
              </p>

              {acc.balance !== undefined && (
                <p className="mt-2 font-bold text-green-600">
                  ₦{acc.balance.toLocaleString()}
                </p>
              )}

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className="bg-white/30 px-3 py-1 rounded-full text-xs"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleShare(acc.accountNumber)}
                  className="bg-white/30 p-2 rounded-full"
                >
                  <FaShareAlt size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BalanceCard;