import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"

import baseUrl from "./Config.js"

function Library() {
  const [listKanban, setListKanban] = useState([])

  useEffect(() => {
    axios.get(baseUrl + "library")
    .then((response) => {
      console.log(response)
      setListKanban(response?.data?.data)
    }).catch((r) => {
      console.log(r)
    })
  }, [])

  return (
    <React.Fragment>
      <div className="w-full py-2 px-6 text-white bg-green-600 font-bold rounded-t-lg">Library</div>
      <div className="w-full p-4">
      <div className="w-full flex flex-row-reverse mb-4">
        <Link to="/library/create"><button className='px-4 py-2 bg-green-600 text-white rounded'>Tambah Library</button></Link>
      </div>
      <table className="w-full rounded-t">
        <thead>
          <tr className="bg-gray-100 text-green-600 rounded">
            <th className='p-2'>Die No</th>
            <th className='p-2'>Part No</th>
            <th className='p-2'>Process</th>
            <th className='p-2'>Part Name</th>
            <th className='p-2'>Material</th>
            <th className='p-2'>Remark</th>
            <th className='p-2'>Maker</th>
            <th className='p-2'>Code</th>
            <th className='p-2'>Price</th>
          </tr>
        </thead>
        <tbody>
          {listKanban.map((item, i) => {
            console.log(item)
            return (
              <tr>
                <th className='font-normal p-2'>{item.die_no}</th>
                <th className='font-normal p-2'>{item.part_no}</th>
                <th className='font-normal p-2'>{item.process}</th>
                <th className='font-normal p-2'>{item.part_name}</th>
                <th className='font-normal p-2'>{item.material}</th>
                <th className='font-normal p-2'>{item.remark}</th>
                <th className='font-normal p-2'>{item.maker}</th>
                <th className='font-normal p-2'>{item.code}</th>
                <th className='font-normal p-2'>{item.price}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </React.Fragment>
  )
}

export default Library;
