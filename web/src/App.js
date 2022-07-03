import React, { useState } from 'react';
import axios from "axios";
import {
  Routes,
  Route,
} from "react-router";
import {Link} from "react-router-dom"

import Kanban from "./pages/Kanban.js"
import KanbanCreate from "./pages/KanbanCreate.js"
import KanbanShow from "./pages/KanbanShow.js"
import LibraryCreate from './pages/LibraryCreate.js';
import Library from './pages/Library.js';

function App() {
  const [menu, setMenu] = useState([
    {text: "Kanban", active: true, "link": "/"}, 
    {text: "Library", active: false, "link": "/library"}, 
    {text: "Resume", active: false, "link": "/resume"},
  ]);

  const [currentContent, setCurrentContent] = useState("kanban")

  return (
    <div className="w-screen grid grid-cols-12">
      <div className="col-span-3 bg-green-700 h-screen py-16">
        <div className="w-full text-center font-bold text-white mb-4">Part Management System</div>
        {menu.map((item, i) => {
          return (
            <Link to={item.link}>
            <div className={`w-full px-8 py-2 cursor-pointer hover:bg-green-900 text-white ${item.active ? "bg-green-900": ""}`}>{item.text}</div>
            </Link>
            
          )
        })}
        <a className=""></a>
      </div>
      <div className="col-span-9 bg-gray-200 h-screen py-16 px-8">
        <div className="w-full h-100 bg-white rounded-t-lg">
          <Routes>
            <Route exact path="/" element={<Kanban />}></Route>
            <Route path="/kanban/:id_kanban" element={<KanbanShow />}></Route>
            <Route exact path="/kanban/create" element={<KanbanCreate />}></Route>
            <Route exact path="/library/create" element={<LibraryCreate />}></Route>
            <Route exact path="/library" element={<Library />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
