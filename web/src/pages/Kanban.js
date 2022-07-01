import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"

function Kanban() {
  const [listKanban, setListKanban] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8001/kanban")
    .then((response) => {
      console.log(response)
      setListKanban(response?.data?.data)
    }).catch((r) => {
      console.log(r)
    })
  }, [])

  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-row-reverse mb-4">
        <Link to="/kanban/create"><button className='px-4 py-2 bg-green-600 text-white rounded'>Buat Kanban</button></Link>
      </div>
      <table className="w-full rounded-t">
        <thead>
          <tr className="bg-gray-100 text-green-600 rounded">
            <th className='p-2'>No</th>
            <th className='p-2'>Kanban</th>
            <th className='p-2'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {listKanban.map((item, i) => {
            console.log(item)
            return (
              <tr>
                <th className='font-normal p-2'>{i+1}</th>
                <th className='font-normal p-2'>{item.name}</th>
                <th className='font-normal p-2 cursor-pointer'><Link to={"/kanban/"+item.id}>Lihat</Link></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Kanban;
