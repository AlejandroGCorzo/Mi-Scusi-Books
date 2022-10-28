import React, { useState } from "react";
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.less';
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

// const handleMenuClick = (e) => {
//   console.log('click', e);
// };

// const menu = (
//   <Menu
//     onClick={(e)=>handleMenuClick(e)}
//     items={[
//       {
//         key: "cancelled",
//         label: "Cancelled",
//       },
//       {
//         key: "approved",
//         label: "Approved",
//       },
//     ]}
//   />
// );

const BillsTable = () => {

  const accessToken =
  window.localStorage.getItem("token") ||
  window.sessionStorage.getItem("token");
  const dispatch = useDispatch()
  const { bills } = useSelector((state) => state.users);
  const [render, setRender] = useState(true)

  console.log(render);
  const handleMenuClick = (e) => {
    console.log('click', e);
    setRender(render === true ? false : true)
  };
  
const menu = (
    <Menu
      onClick={(e)=>handleMenuClick(e)}
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

  const expandedRowRender = (row) => {
    //console.log('row', row.id);

    const columns = [
      {
        title: "Book",
        dataIndex: "book",
        key: "book",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        sorter: (obj1, obj2) => obj1.quantity - obj2.quantity,
      },
      {
        title: "Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        sorter: (obj1, obj2) => obj1.unitPrice - obj2.unitPrice,
      },
    ];

    const datito = bills.find((e) => e._id === row.id);
    //console.log('datito', datito)

    let data = [];
    for (let i = 0; i < datito.books.length; i++) {
      data.push({
        key: datito._id,
        id: datito._id,
        book: datito.books[i].name,
        unitPrice: datito.price[i],
        quantity: datito.amountBooks[i],
      });
    }

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ textTransform: "capitalize" }}
      />
    );
  };

  const data2 = bills?.map((e) => ({
    key: e._id,
    id: e._id,
    user: `${e.user.firstName} ${e.user.lastName}`,
    email: e.user.email,
    firstName: e.user.firstName,
    lastName: e.user.lastName,
    totalPrice: e.total,
    date: e.date,
    //status: e.status,
  }));

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      filters: bills?.map((e) => ({
        text: `${e.user.firstName} ${e.user.lastName}`,
        value: `${e.user.firstName} ${e.user.lastName}`,
      })),
      filterSearch: true,
      onFilter: (name, userObject) => userObject.user.includes(name),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (obj1, obj2) => obj1.totalPrice - obj2.totalPrice,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Cancelled",
          value: "Cancelled",
        },
      ],
      filterSearch: true,
      render: () => (
        <span>
          {data2.status === "approved" ? (
            <>
              <Badge status="success" /> Approved
            </>
          ) : (
            <>
              <Badge status="error" /> Cancelled
            </>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Dropdown overlay={menu} autoFocus={true}>
            <a>
              Set Status <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data2}
        size="small"
        style={{ textTransform: "capitalize" }}
      />
    </>
  );
};

export default BillsTable;
