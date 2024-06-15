import React, { useState, useMemo, useEffect, Fragment } from "react";
import styles from "../css/tallyBoard.module.css";
import { useGetProposalsQuery } from "../api/proposalsApiSlice.js";
import { useTable } from "react-table";
import { useSelector } from "react-redux";
import { useClickAway } from "@uidotdev/usehooks";
import Modal from "./Modal.jsx";
import { getColumns } from "../utility/columns.js";

const TallyBoard = ({ setHasNotifications }) => {
  const [isModal, setIsModal] = useState(false);
  const [clickedRowData, setClickedRowData] = useState({});
  const ref = useClickAway(() => {
    setIsModal(false);
  });
  const { currentData = [], isLoading, isError } = useGetProposalsQuery();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (currentData.length > 0 && user) {
      const notificationsData = currentData.some(
        (proposal) => proposal.user === user._id && proposal.notification
      );
      setHasNotifications(notificationsData);
    }
  }, [currentData, user]);

  const modalClose = () => {
    setIsModal(false);
  };

  const data = useMemo(() => {
    const sortedData = [...currentData].sort(
      (a, b) => b.totalVotes - a.totalVotes
    );
    return sortedData;
  }, [currentData]);

  const columns = useMemo(() => getColumns(), []);

  const onRowClick = (row) => {
    setClickedRowData({ original: row });
    setIsModal(true);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <main className={styles["tally-main"]}>
      <div className={styles["green"]}></div>
      {currentData.length > 1 && (
        <table {...getTableProps()}>
          <thead className={styles["tally-main-head"]}>
            {headerGroups.map((headerGroup) => (
              <tr
                className={styles["tally-columns"]}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className={styles["tally-head"]}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const isUsersProposal = user?.votes?.some(
                (id) => id === row.original._id
              );
              return (
                <tr className={styles["tally-rows"]} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      onClick={() => onRowClick(row)}
                      className={`${styles["tally-d"]} ${
                        row.original.userName === user?.userName
                          ? styles["highlighted-row"]
                          : ""
                      } ${isUsersProposal ? styles["tally-voted-for"] : ""}`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isModal && (
        <span ref={ref} className={styles["modal-span"]}>
          <Modal
            modalClose={modalClose}
            rowData={clickedRowData.original.original}
            setHasNotifications={setHasNotifications}
          />
        </span>
      )}
    </main>
  );
};

export default TallyBoard;
