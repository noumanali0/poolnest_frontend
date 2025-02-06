import React, { Fragment } from 'react'
import Addformheader from '../components/AddCustomers/Addformheader'
import AddCustomerForm from '../components/AddCustomers/AddCustomerForm'
import { Button, Checkbox, Form, Input, Select, Tooltip , Space } from "antd";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"

export default function Addcustomer() {
  return (
    <Fragment>
      <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content">

      
        <div className='addcustomers'>
        <Addformheader/>
        {/* <AddCustomerForm/> */}
        <div className='row fomik customer'>
          <div className='col-sm-6'>
          <Form
          name="Customer"
          // form={form}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row">
         
            <div className="col-sm-6 customerNameeeee">
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </div>

            <div className="col-sm-6 customerNameeeee">
              <Form.Item
                name="last_name"
                label="Last Name"
                // rules={[
                //   { required: true, message: "Please input your Lastname!" },
                // ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>

            <div className="row additionalDetailsss">
              <div
                className="col-sm-12"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: "Email is Required" }]}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>
              </div>
           
          </div>
        </Form>
          </div>
          <div className='col-sm-6'>

          <div className='row customers'>
        <div className='col-sm-5 '>
            <h2>Pool Info</h2>
        </div>
        <div className='col-sm-7 right addCustomersButtonnnn'>
            {/* <button onClick={handleShow} className='bluebtn'>Add Tags</button> */}
        </div>
        </div>

          </div>
        </div>
        </div>
        </div>
        </div>
    </Fragment>
  )
}














// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const data = [
//   {
//     id: "item-1",
//     content: "Item-1",
//   },
//   {
//     id: "item-2",
//     content: "Item-2",
//   },
//   {
//     id: "item-3",
//     content: "Item-3",
//   },
//   {
//     id: "item-4",
//     content: "Item-4",
//   },
//   {
//     id: "item-5",
//     content: "Item-5",
//   },
//   {
//     id: "item-6",
//     content: "Item-6",
//   },
//   {
//     id: "item-7",
//     content: "Item-7",
//   },
//   {
//     id: "item-8",
//     content: "Item-8",
//   },
//   {
//     id: "item-9",
//     content: "Item-9",
//   },
// ];

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,
//   background: isDragging ? "lightgreen" : "grey",
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// const App = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     setItems(data);
//   }, []);

//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const reorderedItems = reorder(
//       items,
//       result.source.index,
//       result.destination.index
//     );

//     setItems(reorderedItems);
//   };

//   return (
//     <div className="main_content">
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       className="card"
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default App;


