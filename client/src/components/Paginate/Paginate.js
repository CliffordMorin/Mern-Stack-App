import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";

import useStyles from "./styles";

const Paginate = ({ page, setPage }) => {
  const { totalPages } = useSelector((state) => state.posts);

  const classes = useStyles();

  return (
    <Pagination
      className={classes.paginate}
      count={totalPages}
      page={Number(page)}
      color="secondary"
      size="large"
      onChange={(event, value) => {
        setPage(value);
      }}
    />
  );
};

export default Paginate;
