import React from "react";
import TablePagination from "@mui/material/TablePagination";

interface Props {
  maxLength: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
}

const CPagination = (props: Props) => {
  const { setPage, setRowsPerPage, maxLength, page, rowsPerPage } = props;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={maxLength}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default CPagination;
