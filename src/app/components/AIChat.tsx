// 'use client';

// import { useState, useRef } from "react";
// import * as XLSX from "xlsx";

// export default function AIChatHero() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [excelData, setExcelData] = useState<any[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });

//     const data = await res.json();
//     const botMsg = { role: "assistant", content: data.response };
//     setMessages((prev) => [...prev, botMsg]);
//     setInput("");
//     setLoading(false);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target?.result as ArrayBuffer);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const json = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(json);
//       console.log("Excel Data:", json);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 lg:px-16">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left Side - Hero Text */}
//         <div>
//           <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
//             Smart AI Assistant for Your Customers
//           </h1>
//           <p className="text-lg text-gray-600 mb-6">
//             Get personalized product recommendations and automate shopping help with AI.
//           </p>
//           <button
//             onClick={() => fileInputRef.current?.click()}
//             className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
//           >
//             + Upload Customer Dataset
//           </button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".xlsx, .xls"
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//           {excelData.length > 0 && (
//             <p className="text-sm mt-4 text-green-700">
//               {excelData.length} records loaded from Excel.
//             </p>
//           )}
//         </div>

//         {/* Right Side - Chat UI */}
//         <div className="bg-white border shadow-xl rounded-2xl p-6 h-[500px] flex flex-col">
//           <div className="text-blue-600 font-semibold text-lg mb-3">AI Assistant</div>
//           <div className="flex-1 overflow-y-auto space-y-2 mb-4">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}
//               >
//                 <span
//                   className={`inline-block px-3 py-2 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
//                 >
//                   {msg.content}
//                 </span>
//               </div>
//             ))}
//             {loading && <div className="text-gray-500 text-sm">Typing...</div>}
//           </div>
//           <div className="flex border-t pt-2">
//             <input
//               className="flex-1 p-2 text-sm border rounded-md mr-2"
//               placeholder="Ask something..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Image from "next/image";

export default function AIChatHero() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { role: "assistant", content: data.response };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
    setLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
      console.log("Excel Data:", json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <section className="bg-[#f0f4f8] py-20 px-6 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Section – EduFlex Style */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Smarter Shopping with AI,{" "}
            <span className="text-purple-600">Tailored Just for You</span>
            <br />
          </h1>
          <p className="text-lg text-gray-600">
            Your personal AI shopping assistant — helping you find the right products, instantly and effortlessly.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition"
            >
              + Upload Dataset
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Learn more
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          {excelData.length > 0 && (
            <p className="text-sm mt-2 text-green-600">{excelData.length} records loaded.</p>
          )}

          {/* Stats */}
          <div className="flex gap-8 pt-6">
            <div>
              <p className="text-2xl font-bold text-gray-800">15.2K</p>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">4.5K</p>
              <p className="text-sm text-gray-600">Tutors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">∞</p>
              <p className="text-sm text-gray-600">Resources</p>
            </div>
          </div>
        </div>

        {/* Right Section – Chatbot with Pastel UI */}
        <div className="relative">
          <div className="bg-white border border-purple-100 shadow-2xl rounded-3xl p-6 h-[500px] flex flex-col pastel-gradient z-10 relative">
            <div className="text-lg font-semibold text-purple-600 mb-3">AI Assistant</div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block px-4 py-2 rounded-2xl max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-50 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div className="text-gray-400 text-sm">Typing...</div>}
            </div>

            <div className="flex border-t pt-3">
              <input
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 mr-2"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>

          {/* Decorative Avatars using Next.js Image */}
          <div className="absolute top-[-25px] left-[-25px]">
            <Image
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Avatar"
              width={48}
              height={48}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="absolute bottom-[-25px] right-[-25px]">
            <Image
              src="https://randomuser.me/api/portraits/men/18.jpg"
              alt="Avatar"
              width={56}
              height={56}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
