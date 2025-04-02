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
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-pink-700">📊 Umsatzübersicht</h1>

      <div className="space-x-2">
        {['day', 'week', 'month', 'quarter', 'year'].map((key) => (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${range === key ? 'bg-pink-500 text-white' : 'bg-white text-pink-700 border-pink-300'}`}
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
          <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <div>
        <h2 className="text-xl font-semibold mb-2">⭐ Top Artikel</h2>
        <ul className="space-y-1">
          {topArticles.map((item, idx) => (
            <li key={idx} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <span>{item.name}</span>
              <span className="font-bold text-pink-600">{item.sold} verkauft</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📦 Produktinfos</h2>
        <ul className="space-y-2">
          {productInfo.map((prod, idx) => (
            <li
              key={idx}
              className={`p-3 rounded shadow flex justify-between items-center ${statusColor[prod.status]}`}
            >
              <span>{prod.name}</span>
              <span className="capitalize">{prod.status === 'new' ? 'Frisch' : prod.status === 'low' ? 'Geringer Bestand' : 'MHD bald'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}