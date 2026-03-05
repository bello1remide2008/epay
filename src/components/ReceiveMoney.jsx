import React, { useState, useEffect } from "react";
import { Bell, Download, Share2, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const ReceiveMoney = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [activeAccount, setActiveAccount] = useState(null);

  // 🔹 Load account from localStorage
  useEffect(() => {
    let accounts =
      JSON.parse(localStorage.getItem("epay_accounts")) || [];

    // ✅ If no account exists, create a default one
    if (accounts.length === 0) {
      const defaultAccount = {
        accountNumber: "EPAY" + Math.floor(Math.random() * 1000000),
        phone: "08000000000",
      };

      accounts = [defaultAccount];
      localStorage.setItem("epay_accounts", JSON.stringify(accounts));
    }

    setActiveAccount(accounts[0]);
  }, []);

  // 🔹 Copy Function
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // 🔹 Share Function
  const handleShare = () => {
    if (!activeAccount) return;

    const shareData = {
      title: "Receive Money on Epay",
      text: `Send money to ${activeAccount.accountNumber}`,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      alert("Sharing not supported on this device");
    }
  };

  // 🔹 QR Value
  const qrValue = activeAccount
    ? JSON.stringify({
        accountNumber: activeAccount.accountNumber,
        amount: amount || "",
      })
    : "EPAY";

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">

      {/* 🔔 Notification */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/notifications")}
          className="bg-white p-2 rounded-full shadow"
        >
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* 💰 ENTER AMOUNT */}
      <div className="bg-white rounded-2xl p-5 shadow mb-6">
        <p className="text-sm font-medium mb-2">
          Request specific amount{" "}
          <span className="text-gray-400">(optional)</span>
        </p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-3 outline-none"
        />

        <p className="text-right font-semibold text-lg mt-2">
          ₦{amount || "0.00"}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Leave empty to allow sender enter amount
        </p>
      </div>

      {/* 🧾 QR CODE CARD */}
      <div className="bg-white rounded-2xl p-6 shadow mb-6 flex flex-col items-center">

        <div className="bg-white p-4 rounded-xl">
          <QRCode
            value={qrValue}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <div className="flex justify-between w-full mt-6 gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-lg">
            <Download className="w-4 h-4" />
            Save
          </button>

          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-lg"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* 🏦 WALLET INFORMATION */}
      {activeAccount && (
        <div className="bg-white rounded-2xl p-5 shadow mb-6 space-y-4">

          {/* PHONE */}
          <div>
            <p className="text-xs text-gray-400 mb-1">Phone Number</p>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <span className="flex-1 font-semibold">
                {activeAccount.phone}
              </span>

              <button
                onClick={() => handleCopy(activeAccount.phone)}
                className="bg-gray-100 p-2 rounded-lg"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACCOUNT NUMBER */}
          <div>
            <p className="text-xs text-gray-400 mb-1">
              Account Number
            </p>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <span className="flex-1 font-semibold">
                {activeAccount.accountNumber}
              </span>

              <button
                onClick={() =>
                  handleCopy(activeAccount.accountNumber)
                }
                className="bg-gray-100 p-2 rounded-lg"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📘 HOW TO RECEIVE */}
      <div className="bg-amber-100 rounded-2xl p-4">
        <p className="font-semibold mb-3">How to receive money</p>

        <ul className="space-y-2 text-sm">
          <li>✓ Share your QR code or wallet details</li>
          <li>✓ Sender scans QR or enters your number</li>
          <li>✓ You get notified instantly</li>
        </ul>
      </div>

    </div>
  );
};

export default ReceiveMoney;