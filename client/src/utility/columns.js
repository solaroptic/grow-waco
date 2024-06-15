export const getColumns = () => {
  return [
    {
      Header: "Votes",
      accessor: "totalVotes",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "User",
      accessor: "userName",
    },
  ];
};
