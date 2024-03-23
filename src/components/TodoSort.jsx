import { Heading } from "@chakra-ui/react";
import React from "react";

const TodoSort = ({ sortOption, handleSortChange }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        margin: "auto",
        justifyContent: "space-between",
      }}
    >
      <Heading>Sort By Date</Heading>
      <div>
        <label htmlFor="sortOption">Sort:</label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default TodoSort;
