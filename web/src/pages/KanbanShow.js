import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom"

import baseUrl from "./Config.js"

function KanbanShow() {
  const [kanban, setKanban] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  let params = useParams()

  useEffect(() => {
    axios.get(baseUrl + "kanban/" + params.id_kanban)
    .then((response) => {
      console.log(response)
      setKanban(response?.data?.data[0])
      setIsLoaded(true)
    }).catch((r) => {
      console.log(r)
    })
  }, [])

  if(!isLoaded) {
    return <center>Loading</center>
  }
  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-row-reverse mb-4">
        <Link to="/kanban/create"><button className='px-4 py-2 bg-green-600 text-white rounded'>Buat Kanban</button></Link>
      </div>
      <table className="w-full rounded-t overflow-y">
        <thead>
          <tr className="bg-gray-100 text-green-600 rounded">
            <th className='p-2'>Part No</th>
            <th className='p-2'>Part Name</th>
            <th className='p-2'>QTY</th>
            <th className='p-2'>Code</th>
            <th className='p-2'>Price</th>
            <th className='p-2'>Total Price</th>
            <th className='p-2'>D</th>
            <th className='p-2'>T</th>
            <th className='p-2'>C</th>
            <th className='p-2'>M</th>
            <th className='p-2'>PC</th>
          </tr>
        </thead>
        <tbody>
          {kanban.parts.map((item, i) => {
            item.code = "-"
            if(item.library !== null) {
              item.price = item.library.price
              item.code = item.library.code
            }
            return (
              <tr>
                <td className='p-2'>{item.number}</td>
                <td className='p-2'>{item.name}</td>
                <td className='p-2'>{item.qty}</td>
                <td className='p-2'>{item.code}</td>
                <td className='p-2'>{item.price}</td>
                <td className='p-2'>{item.price*item.qty}</td>
                <td className='p-2'>{item.code == "D" ? item.price*item.qty : 0}</td>
                <td className='p-2'>{item.code == "T" ? item.price*item.qty : 0}</td>
                <td className='p-2'>{item.code == "C" ? item.price*item.qty : 0}</td>
                <td className='p-2'>{item.code == "M" ? item.price*item.qty : 0}</td>
                <td className='p-2'>{item.code == "PC" ? item.price*item.qty : 0}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default KanbanShow;
