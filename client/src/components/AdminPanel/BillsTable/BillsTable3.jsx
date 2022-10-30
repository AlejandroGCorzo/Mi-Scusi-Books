import React, { useState, useEffect } from "react";
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.less';
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Popconfirm, Button, Badge, Dropdown, Menu, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills } from "../../../redux/StoreUsers/usersActions";
import { setBillStatus } from "../../../redux/StoreUsers/usersActions";

const BillsTable = () => {
  const accessToken =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.users);
  const { users } = useSelector((state) => state.users);
  const [render, setRender] = useState(true);

  const handleMenuClick = (id , status) => {
    //console.log("click", e.key);
    console.log("record", id);
    console.log("a -> c", status, '->', status === 'approved' ? 'cancelled' : 'approved' );

    status = status === 'approved' ? 'cancelled' : 'approved'

    console.log("status", status);
    dispatch(setBillStatus(id, status, accessToken))
    setRender(render === true ? false : true);
  };

  const data2 = users?.map((e) => ({
    key: e._id,
    id: e._id,
    user: `${e.firstName} ${e.lastName}`,
    email: e.email,
    firstName: e.firstName,
    lastName: e.lastName,
    dni: e.dni,
    phone: e.phone,
    type: e.type,
    state: e.state,
  }));

  const menu = (key) => (
    <Menu
      onClick={(e) => handleMenuClick(e, key)}
      items={[
        {
          key: "cancelled",
          label: "Cancelled",
        },
        {
          key: "approved",
          label: "Approved",
        },
      ]}
    />

  );

  // const expandedRowRender = (row) => {
  //   //console.log('row', row.id);

  //   const columns = [
  //     {
  //       title: "Email",
  //       dataIndex: "email",
  //       key: "email",
  //     },
  //     {
  //       title: "First Name",
  //       dataIndex: "firstName",
  //       key: "firstName",
  //       //sorter: (obj1, obj2) => obj1.quantity - obj2.quantity,
  //     },
  //     {
  //       title: "Last Name",
  //       dataIndex: "lastName",
  //       key: "lastName",
  //       //sorter: (obj1, obj2) => obj1.unitPrice - obj2.unitPrice,
  //     },
  //   ];

  //   const datito = bills.find((e) => e._id === row.id);
  //   //console.log('datito', datito)

  //   let data = [];
  //   for (let i = 0; i < datito.books.length; i++) {
  //     data.push({
  //       key: datito._id,
  //       id: datito._id,
  //       book: datito.books[i].name,
  //       unitPrice: datito.price[i],
  //       quantity: datito.amountBooks[i],
  //     });
  //   }

  //   return (
  //     <Table
  //       columns={columns}
  //       dataSource={data}
  //       pagination={false}
  //       style={{ textTransform: "capitalize" }}
  //     />
  //   );
  // };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // filters: bills?.map((e) => ({
      //   text: `${e.user.firstName} ${e.user.lastName}`,
      //   value: `${e.user.firstName} ${e.user.lastName}`,
      // })),
      // filterSearch: true,
      // onFilter: (name, userObject) => userObject.user.includes(name),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      //sorter: (obj1, obj2) => obj1.totalPrice - obj2.totalPrice,
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      // filters: [
      //   {
      //     text: "Approved",
      //     value: "Approved",
      //   },
      //   {
      //     text: "Cancelled",
      //     value: "Cancelled",
      //   },
      // ],
      //filterSearch: true,
      // render: (_, record) => (
      //   <span>
      //     {record.status === "approved" ? (
      //       <>
      //         <Badge status="success" /> Approved
      //       </>
      //     ) : (
      //       <>
      //         <Badge status="error" /> Cancelled
      //       </>
      //     )}
      //   </span>
      // ),
    },
    {
      title: 'Rol',
      dataIndex: "type",
      key: "type",
      // render: (_, record) => (
      //   <Space size="middle">
      //     {record.status === 'approved' ? 
      //      <Popconfirm
      //      title="Sure to set status to Cancelled?"
      //      onConfirm={(e) => handleMenuClick(record.key, record.status)}
      //      >
      //       <a>Set status Cancelled</a>
      //      </Popconfirm>
      //      :            
      //      <Popconfirm
      //      title="Sure to set status to Approved?"
      //      onConfirm={(e) => handleMenuClick(record.key,record.status)}
      //      >
      //       <a>Set status Approved</a>
      //      </Popconfirm>}

      //   </Space>
      // ),
    },
    {
      title: "Rol Actions",
      dataIndex: "state",
      key: "state",
      render: (_, record) => (
        <span>
          {record.state === "normal" ? (
            <>
              <Badge status="success" /> Normal
              <Badge status="success" /> Seller
              <Badge status="error" /> Admin
            </>
          ) : (
            <>
              <Badge status="success" /> Normal
              <Badge status="success" /> Seller
              <Badge status="error" /> Admin
            </>
          )}
        </span>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "State Actions",
      dataIndex: "state",
      key: "state",
      render: (_, record) => (
        <span>
          {record.state === "active" ? (
            <>
              <Badge status="success" /> Block
              <Badge status="error" /> Delete
            </>
          ) : (
            <>
              <Badge status="success" /> Unblock
              <Badge status="error" /> Delete
            </>
          )}
        </span>
      ),
    },
  ];

  const [selectUser, setSelectUser] = useState('');
  console.log(selectUser);


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //if(selectedRows.length > 1) selectedRows.shift()
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectUser(selectedRows.length === 0 ? '' : selectedRows[0].email)
    },
    getCheckboxProps: (record) => ({
      disabled: record.email === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    dispatch(getAllBills(accessToken));
  }, [dispatch]);

  return (
    <>
    <div>
      <span>User selected: {selectUser}</span>
    </div>
      <Table
        columns={columns}
        //expandedRowRender={expandedRowRender}
        rowSelection={{type: 'radio', ...rowSelection, hideSelectAll: true}}
        dataSource={/* users */ data2 }
        size="small"
        style={{ textTransform: "capitalize" }}
      />
    </>
  );
};

export default BillsTable;

// Radio checkboxs

// import React, { useState } from 'react';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Divider, Radio, Table } from 'antd';

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Disabled User',
//     age: 99,
//     address: 'Sidney No. 1 Lake Park',
//   },
// ];

// // rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows
//     );
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === 'Disabled User',
//     // Column configuration not to be checked
//     name: record.name,
//   }),
// };
// const App = () => {
//   //const [selectionType, setSelectionType] = useState('checkbox');
//   return (
//     <div>
//       {/* <Radio.Group
//         onChange={({ target: { value } }) => {
//           setSelectionType(value);
//         }}
//         value={selectionType}
//       >
//         <Radio value="checkbox">Checkbox</Radio>
//         <Radio value="radio">radio</Radio>
//       </Radio.Group>

//       <Divider /> */}

//       <Table
//         rowSelection={{
//           type: 'radio',
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={data}
//       />
//     </div>
//   );
// };
// export default App;

// Header for selections

// import React, { useState } from 'react';
// import 'antd/dist/antd.css';
// import './index.css';
// import { Button, Table } from 'antd';

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//   },
// ];
// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
// const App = () => {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const start = () => {
//     setLoading(true);
//     // ajax request after empty completing
//     setTimeout(() => {
//       setSelectedRowKeys([]);
//       setLoading(false);
//     }, 1000);
//   };
//   const onSelectChange = (newSelectedRowKeys) => {
//     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//   };
//   const hasSelected = selectedRowKeys.length > 0;
//   return (
//     <div>
//       <div
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
//           Reload
//         </Button>
//         <span
//           style={{
//             marginLeft: 8,
//           }}
//         >
//           {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//         </span>
//       </div>
//       <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
//     </div>
//   );
// };
// export default App;