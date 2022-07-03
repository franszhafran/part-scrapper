import React, { useState } from 'react';
import axios from "axios";

import baseUrl from "./Config.js"

//   const updateForm = (e) => {
//     let initial_data = data
    
//     if(e.target.name == "kanban_file") {
//       initial_data[e.target.name] = e.target.files[0]
//     } else {
//       initial_data[e.target.name] = e.target.value
//     }
//     setFormData(initial_data)
//   }

//   if(menuContext == "create_kanban") {
//     return <form onSubmit={(e) => {
//       e.preventDefault()
//       let formData = new FormData();
//       Object.keys(data).map((item, i) => {
//         formData.append(item, data[item])
//       })
//       console.log(data)
      
//       // the image field name should be similar to your api endpoint field name
//       // in my case here the field name is customFile

//       axios.post(
//           "http://localhost:8001/import-parts",
//           formData,
//           {
//               headers: {
//                   "Content-type": "multipart/form-data",
//               },                    
//           }
//       )
//     }}>
//       <div className="grid grid-cols-12 py-4 px-6">
//         <div className="col-span-3 p-2">Kanban Name</div>
//         <div className="col-span-9 mb-4">
//           <input className="p-2 border border-px w-full" type="text" name="kanban_name" onChange={updateForm}></input>
//         </div>
//         <div className="col-span-3 p-2">Input File</div>
//         <div className="col-span-9">
//           <input className="p-2 border border-px w-full" type="file" name="kanban_file" onChange={updateForm}></input>
//         </div>
//         <div className="col-span-3 p-2"></div>
//         <div className="col-span-9 py-2">
//           <input type="submit" className="px-4 py-2 cursor-pointer rounded text-white bg-green-600 mb-4"></input>
//         </div>
//       </div>
//     </form>
//   }
//   return menuContext
// }

function KanbanCreate() {
  const [formState, setFormState] = useState({})

  const updateForm = (e) => {
    let initial_data = formState
    
    if(e.target.name == "kanban_file") {
      initial_data[e.target.name] = e.target.files[0]
    } else {
      initial_data[e.target.name] = e.target.value
    }
    setFormState(initial_data)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      let formData = new FormData();
      Object.keys(formState).map((item, i) => {
        formData.append(item, formState[item])
      })
      
      // the image field name should be similar to your api endpoint field name
      // in my case here the field name is customFile

      axios.post(
          baseUrl + "import-parts",
          formData,
          {
              headers: {
                  "Content-type": "multipart/form-data",
              },                    
          }
      ).then((response) => {
        alert(response?.data?.status)
      }).catch((e) => {
        alert("Error")
      })
    }}>
      <div className="grid grid-cols-12 py-4 px-6">
        <div className="col-span-3 p-2">Kanban Name</div>
        <div className="col-span-9 mb-4">
          <input className="p-2 border border-px w-full" type="text" name="kanban_name" onChange={updateForm}></input>
        </div>
        <div className="col-span-3 p-2">Input File</div>
        <div className="col-span-9">
          <input className="p-2 border border-px w-full" type="file" name="kanban_file" onChange={updateForm}></input>
        </div>
        <div className="col-span-3 p-2"></div>
        <div className="col-span-9 py-2">
          <input type="submit" className="px-4 py-2 cursor-pointer rounded text-white bg-green-600 mb-4"></input>
        </div>
      </div>
    </form>
  )
}


export default KanbanCreate;
