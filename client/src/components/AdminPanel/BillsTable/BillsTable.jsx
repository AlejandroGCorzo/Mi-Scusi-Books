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

  const data2 = bills?.map((e) => ({
    key: e._id,
    id: e._id,
    user: `${e.user.firstName} ${e.user.lastName}`,
    email: e.user.email,
    firstName: e.user.firstName,
    lastName: e.user.lastName,
    totalPrice: e.total,
    date: e.date,
    status: e.status,
  }));

  const expandedRowRender = (row) => {
    //console.log('row', row.id);

    const columns = [
      {
        title: "Books",
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
    console.log('datito', datito)

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
    console.log(data);

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ textTransform: "capitalize" }}
      />
    );
  };

  const duplicateFilter = bills?.map((e) => ({
    text: `${e.user.firstName} ${e.user.lastName}`,
    value: `${e.user.firstName} ${e.user.lastName}`,
  }))
  const uniqueFilter = [...new Map(duplicateFilter.map(item => [item.text, item])).values()]
  //console.log(uniqueFilter);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      filters: uniqueFilter,
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
      render: (_, record) => (
        <span>
          {record.status === "approved" ? (
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
      title: 'Change Status',
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'approved' ? 
           <Popconfirm
           title="Sure to set status to Cancelled?"
           onConfirm={(e) => handleMenuClick(record.key, record.status)}
           >
            <a>Set status Cancelled</a>
           </Popconfirm>
           :            
           <Popconfirm
           title="Sure to set status to Approved?"
           onConfirm={(e) => handleMenuClick(record.key,record.status)}
           >
            <a>Set status Approved</a>
           </Popconfirm>}

        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllBills(accessToken));
  }, [dispatch]);

  return (
    <>
      <Table
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data2}
        size="small"
        style={{ textTransform: "capitalize" }}
        pagination={{
          position: ['bottomLeft'],
        }}
      />
    </>
  );
};

export default BillsTable;
