import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const dummySales = {
  day: [
    { name: 'Mo', value: 120 },
    { name: 'Di', value: 150 },
    { name: 'Mi', value: 90 },
    { name: 'Do', value: 200 },
    { name: 'Fr', value: 300 },
    { name: 'Sa', value: 260 },
    { name: 'So', value: 180 },
  ],
  week: [
    { name: 'KW14', value: 1500 },
    { name: 'KW15', value: 2300 },
    { name: 'KW16', value: 1800 },
  ],
  month: [
    { name: 'Jan', value: 3000 },
    { name: 'Feb', value: 2800 },
    { name: 'Mär', value: 3200 },
    { name: 'Apr', value: 4100 },
  ],
  quarter: [
    { name: 'Q1', value: 8800 },
    { name: 'Q2', value: 4100 },
  ],
  year: [
    { name: '2023', value: 31000 },
    { name: '2024', value: 28000 },
  ],
};

const topArticles = [
  { name: 'Takis Blue Heat', sold: 240 },
  { name: 'Fanta Exotic', sold: 200 },
  { name: 'Airheads Erdbeere', sold: 180 },
  { name: 'Chupa Chups Cola', sold: 150 },
  { name: 'Skittles Original', sold: 130 },
];

const productInfo = [
  { name: 'Chupa Chups Apfel', status: 'new' },
  { name: 'Prime Ice Pop', status: 'low' },
  { name: 'Takis Fuego', status: 'expiring' },
];

export default function AdminDashboard() {
  const [range, setRange] = useState('week');

  const statusColor = {
    new: 'bg-green-200 text-green-800',
    low: 'bg-orange-200 text-orange-800',
    expiring: 'bg-red-200 text-red-800',
  };

  return (
    <div className="min-h-screen bg-[#FFE1FF] font-baloo flex flex-col items-center justify-start py-10 px-4 relative overflow-hidden">
      {/* Hintergrundglanz fürs Logo */}
      <div className="absolute top-8 z-0 w-64 h-64 bg-gradient-to-br from-purple-400 via-fuchsia-500 to-yellow-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <img
        src="https://kingcandy-shop.de/wp-content/uploads/2020/11/logo.svg"
        alt="KingCandy Logo"
        className="h-20 mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] z-10"
      />

      <div className="bg-white/70 rounded-3xl shadow-2xl p-6 w-full max-w-5xl space-y-12 backdrop-blur-xl z-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-pink-700 drop-shadow">📊 Umsatzübersicht</h1>

          <div className="flex justify-center gap-2 flex-wrap">
            {['day', 'week', 'month', 'quarter', 'year'].map((key) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`px-4 py-1 rounded-full text-sm font-semibold shadow transition duration-200 ${range === key ? 'bg-pink-500 text-white' : 'bg-white text-pink-700 border border-pink-300 hover:bg-pink-100'}`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummySales[range]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border-t border-pink-200 pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-pink-700 text-center">⭐ Top Artikel</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topArticles.map((item, idx) => (
              <li key={idx} className="bg-white/80 p-4 rounded-xl shadow flex justify-between items-center border border-pink-100">
                <span>{item.name}</span>
                <span className="font-bold text-pink-600">{item.sold} verkauft</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-pink-200 pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-pink-700 text-center">📦 Produktinfos</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {productInfo.map((prod, idx) => (
              <li
                key={idx}
                className={`p-4 rounded-xl shadow flex justify-between items-center border ${statusColor[prod.status]}`}
              >
                <span>{prod.name}</span>
                <span className="capitalize font-semibold">{prod.status === 'new' ? 'Frisch' : prod.status === 'low' ? 'Geringer Bestand' : 'MHD bald'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
