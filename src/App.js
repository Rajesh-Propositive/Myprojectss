import React, { useState, useEffect } from "react";
import Table from "./Table";
import fakeData from "./fakeData";

const App = () => {
  const [activeOption, setActiveOption] = useState();

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "documentTypeCode"
      },
      {
        Header: "Doc No.",
        accessor: "documentNumber"
      },
      {
        Header: "Date Created",
        accessor: "documentDate"
      },
      {
        Header: "Due Date",
        accessor: "dueDate"
      },
      {
        Header: "Total Value",
        accessor: "value"
      },
      {
        Header: "Outstanding",
        accessor: "outstanding"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Selected",
        accessor: "selected"
      }
    ],
    [activeOption]
  );

  return (
    <div>
      <Table
        activeOption={activeOption}
        data={React.useMemo(() => fakeData, [])}
        columns={columns}
        defaultPageSize={5}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showPaginationBottom={true}
      />
    </div>
  );
};

export default App;
