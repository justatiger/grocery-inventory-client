import React from "react";
import { Button, Card, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, deleteProducts } from "../actions/productActions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: "10px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
}));

const ProductTable = ({ handleClickOpen, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  console.log(products);

  const delProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const delProducts = (idArr) => {
    dispatch(deleteProducts(idArr));
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Product
        </Button>
      </div>
      <Card>
        <MaterialTable
          title="Product Details"
          columns={[
            {
              title: "Image",
              field: "imageUrl",
              render: (rowData) => (
                <img
                  alt="ProductImage"
                  style={{ height: 45, borderRadius: "50%" }}
                  src={rowData.imageUrl}
                />
              ),
            },
            { title: "Name", field: "name" },
            { title: "Description", field: "description" },
            { title: "Price", field: "price" },
            { title: "Quantity", field: "quantity" },
            {
              title: "Edit/Delete",
              field: "edit",
              render: (rowData) =>
                rowData && (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setCurrentId(rowData._id);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        delProduct(rowData._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
            },
          ]}
          data={products}
          actions={[
            {
              tooltip: "Remove All Selected Contacts",
              icon: "delete",
              onClick: (evt, data) => delProducts(data.map((a) => a._id)),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true,
          }}
        />
      </Card>
    </>
  );
};

export default ProductTable;
