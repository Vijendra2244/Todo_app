import { Heading } from "@chakra-ui/react";
import React from "react";

const TodoFilter = ({
  filterStatus,
  filterAssignee,
  users,
  handleFilterStatusChange,
  handleFilterAssigneeChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        margin: "auto",
        justifyContent:"space-between"
      }}
    >
      <Heading textAlign={"center"}>Filter</Heading>
      <div>
        <label htmlFor="statusFilter">Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => handleFilterStatusChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="assigneeFilter">Assignee:</label>
        <select
          id="assigneeFilter"
          value={filterAssignee}
          onChange={(e) => handleFilterAssigneeChange(e.target.value)}
        >
          <option value="">All</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TodoFilter;
