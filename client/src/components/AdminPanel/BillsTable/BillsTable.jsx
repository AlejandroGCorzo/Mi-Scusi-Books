import React from "react";
//import 'antd/dist/antd.css';
//import 'antd/dist/antd.less';
import "./index.css";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu, Space, Table } from "antd";

import { useSelector } from "react-redux";
import { capitalize } from "@mui/material";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Cancel",
      },
      {
        key: "2",
        label: "Aprove",
      },
      {
        key: "3",
        label: "Pending",
      },
    ]}
  />
);

const BillsTable = () => {
  const { bills } = useSelector((state) => state.users);

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

    const datito = bills.find(e => e._id === row.id);
    //console.log('datito', datito)

    let data = [];
    for(let i = 0; i < datito.books.length; i++){
      data.push({
        key: datito._id,
        id: datito._id,
        book: datito.books[i].name,
        unitPrice: datito.price[i],
        quantity: datito.amountBooks[i]
      })
    }

    return <Table columns={columns} dataSource={data} pagination={false} style={{textTransform: 'capitalize'}} />;
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      filters: bills?.map(e=> ({
        text: `${e.user.firstName} ${e.user.lastName}`,
        value: `${e.user.firstName} ${e.user.lastName}`
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
      render: () => (
        <span>
          <Badge status="success" /> Finished
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Dropdown overlay={menu}>
            <a>
              Set Status <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data2 = bills?.map((e) => ({
    key: e._id,
    id: e._id,
    user: `${e.user.firstName} ${e.user.lastName}`,
    email: e.user.email,
    firstName: e.user.firstName,
    lastName: e.user.lastName,
    totalPrice: e.total,
  }));
  //console.log(data2);
  // `$ ${e.total}`
  return (
    <>
      <Table
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data2}
        size="small"
        style={{textTransform: 'capitalize'}}
      />
    </>
  );
};

export default BillsTable;
