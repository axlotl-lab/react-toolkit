import { Story } from '@storybook/blocks';
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Column, SortState, Table } from "./table";

const meta: Meta = {
  title: 'Components/Table'
};

export default meta;

type Story = StoryObj;

type User = {
  id: number | string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

export const Default: Story = {
  args: {},
  argTypes: {},
  render: function Render(args) {

    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, isActive: true },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, isActive: false },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, isActive: true },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, isActive: true },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 40, isActive: false },
    ];

    // Column definitions
    const columns: Column<User>[] = [
      { header: 'ID', accessor: 'id' },
      { header: 'Name', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      {
        header: 'Age',
        render: (user) => <span className={user.age > 30 ? 'text-red-500' : 'text-green-500'}>{user.age}</span>
      },
      {
        header: 'Status',
        render: (user) => (
          <span className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        )
      },
      {
        header: 'Action',
        render: (user) => (
          <button onClick={(e) => { e.stopPropagation(); alert('Clicked on button') }}>
            {user.isActive ? 'Deactivate' : 'Activate'}
          </button >
        )
      }
    ];

    return (
      <div style={{ width: '100%', maxWidth: 600, margin: '0 15px' }}>
        <Table columns={columns} data={users} onRowClick={(user) => console.log(user)} />
      </div>
    )
  }
};

export const Disabled: Story = {
  args: {},
  argTypes: {},
  render: function Render(args) {

    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, isActive: true },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, isActive: false },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, isActive: true },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, isActive: true },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 40, isActive: false },
    ];

    // Column definitions
    const columns: Column<User>[] = [
      { header: 'ID', accessor: 'id' },
      { header: 'Name', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      {
        header: 'Age',
        render: (user) => <span className={user.age > 30 ? 'text-red-500' : 'text-green-500'}>{user.age}</span>
      },
      {
        header: 'Status',
        render: (user) => (
          <span className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        )
      },
      {
        header: 'Action',
        render: (user) => (
          <button onClick={(e) => { e.stopPropagation(); alert('Clicked on button') }}>
            {user.isActive ? 'Deactivate' : 'Activate'}
          </button >
        )
      }
    ];

    return (
      <div style={{ width: '100%', maxWidth: 600, margin: '0 15px' }}>
        <Table disabled columns={columns} data={users} onRowClick={(user) => console.log(user)} />
      </div>
    )
  }
};

export const ClientSorting: Story = {
  args: {},
  argTypes: {},
  render: function Render(args) {

    const users: User[] = [
      { id: "1", name: 'John Doe', email: 'john@example.com', age: 30, isActive: true },
      { id: "2", name: 'Jane Smith', email: 'jane@example.com', age: 25, isActive: false },
      { id: "3", name: 'Bob Johnson', email: 'bob@example.com', age: 35, isActive: true },
      { id: "4", name: 'Alice Brown', email: 'alice@example.com', age: 28, isActive: true },
      { id: "5", name: 'Charlie Wilson', email: 'charlie@example.com', age: 40, isActive: false },
      { id: "6", name: 'Bob Brown', email: 'bob@example.com', age: 35, isActive: true },
      { id: "7", name: 'Alice Wilson', email: 'alice@example.com', age: 28, isActive: true },
      { id: "8", name: 'Charlie Die', email: 'charlie@example.com', age: 40, isActive: false },
      { id: "9", name: 'Bob Smith', email: 'bob@example.com', age: 35, isActive: true },
      { id: "10", name: 'Alice Johnson', email: 'alice@example.com', age: 28, isActive: true },
      { id: "11", name: 'Daniela Martínez', email: 'daniela@example.com', age: 33, isActive: true },
      { id: "12", name: 'Eduardo Garcia', email: 'eduardo@example.com', age: 24, isActive: false },
      { id: "13", name: 'Francisca Moreno', email: 'francisca@example.com', age: 29, isActive: true },
      { id: "14", name: 'Gabriel Lopez', email: 'gabriel@example.com', age: 31, isActive: false },
      { id: "15", name: 'Helena Pérez', email: 'helena@example.com', age: 27, isActive: true }
    ];

    // Column definitions
    const columns: Column<User>[] = [
      { header: 'ID', accessor: 'id', sortable: true, sortType: 'number' },
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Email', accessor: 'email', sortable: true },
      {
        header: 'Age',
        sortable: true,
        accessor: 'age',
        render: (user) => <span className={user.age > 30 ? 'text-red-500' : 'text-green-500'}>{user.age}</span>
      },
      {
        header: 'Status',
        render: (user) => (
          <span className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        )
      }
    ];

    return (
      <div style={{ width: '100%', maxWidth: 600, margin: '0 15px' }}>
        <Table
          columns={columns}
          data={users}
          onRowClick={(user) => console.log(user)}
        />
      </div>
    )
  }
};

export const ServerSorting: Story = {
  args: {},
  argTypes: {},
  render: function Render(args) {
    const [data, setData] = React.useState<User[]>([])

    const users: User[] = [
      { id: "1", name: 'John Doe', email: 'john@example.com', age: 30, isActive: true },
      { id: "2", name: 'Jane Smith', email: 'jane@example.com', age: 25, isActive: false },
      { id: "3", name: 'Bob Johnson', email: 'bob@example.com', age: 35, isActive: true },
      { id: "4", name: 'Alice Brown', email: 'alice@example.com', age: 28, isActive: true },
      { id: "5", name: 'Charlie Wilson', email: 'charlie@example.com', age: 40, isActive: false },
      { id: "6", name: 'Bob Brown', email: 'bob@example.com', age: 35, isActive: true },
      { id: "7", name: 'Alice Wilson', email: 'alice@example.com', age: 28, isActive: true },
      { id: "8", name: 'Charlie Die', email: 'charlie@example.com', age: 40, isActive: false },
      { id: "9", name: 'Bob Smith', email: 'bob@example.com', age: 35, isActive: true },
      { id: "10", name: 'Alice Johnson', email: 'alice@example.com', age: 28, isActive: true },
      { id: "11", name: 'Daniela Martínez', email: 'daniela@example.com', age: 33, isActive: true },
      { id: "12", name: 'Eduardo Garcia', email: 'eduardo@example.com', age: 24, isActive: false },
      { id: "13", name: 'Francisca Moreno', email: 'francisca@example.com', age: 29, isActive: true },
      { id: "14", name: 'Gabriel Lopez', email: 'gabriel@example.com', age: 31, isActive: false },
      { id: "15", name: 'Helena Pérez', email: 'helena@example.com', age: 27, isActive: true }
    ];

    // Column definitions
    const columns: Column<User>[] = [
      { header: 'ID', accessor: 'id', sortable: true, sortType: 'number' },
      { header: 'Name', accessor: 'name', sortable: true },
      { header: 'Email', accessor: 'email', sortable: true },
      {
        header: 'Age',
        sortable: true,
        accessor: 'age',
        render: (user) => <span className={user.age > 30 ? 'text-red-500' : 'text-green-500'}>{user.age}</span>
      },
      {
        header: 'Status',
        render: (user) => (
          <span className={`px-2 py-1 rounded ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        )
      }
    ];

    const getDataFromServer = (sortState?: SortState) => {

      if (!sortState) {
        setData(users);
        return
      }

      const sortedData = users.sort((a: any, b: any) => {
        const aValue = a[sortState.field];
        const bValue = b[sortState.field];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
        return sortState.direction === 'asc' ? comparison : -comparison;
      });

      setTimeout(() => {
        setData(sortedData)
      }, 1500);
    }

    React.useEffect(() => {
      getDataFromServer();
    }, []);

    return (
      <div style={{ width: '100%', maxWidth: 600, margin: '0 15px' }}>
        <Table
          columns={columns}
          data={data}
          onRowClick={(user) => console.log(user)}
          onSort={getDataFromServer}
          serverHandled
        />
      </div>
    )
  }
};