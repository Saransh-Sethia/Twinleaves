import React, { useState, useEffect } from "react";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import axios from "axios";
import icon from "../../assets/icon.png";
import bread from "../../assets/bread.png";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const performAPI = async () => {
    const response = await axios.get(
      "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products"
    );
    const result = await response.data;
    let resultantArr = [];
    resultantArr.push(result);
    const res = resultantArr[0].products;

    console.log("result", res);
    setProducts(res);
  };
  useEffect(() => {
    performAPI();
  }, []);

  const handleImageError = (e) => {
    e.target.src = bread;
  };

  const columns = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "main_category", headerName: "Category", width: 200 },
    {
      field: "mrp",
      headerName: "Price",
      width: 200,
      valueGetter: (res) => {
        return `₹${res.mrp.mrp || 0}`;
      },
    },
    {
      field: "images",
      headerName: "Image",
      width: 200,
      renderCell: (products) => (
        <img
          src={
            products.value && products.value.front
              ? products.value.front
              : bread
          }
          alt={products.name}
          onError={handleImageError}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];
  return (
    <div className="container">
      <div className="heading">
        <img src={icon} alt="icon-image" className="app-icon" />
        <h1>Satisfy your needs within minutes</h1>
      </div>
      <div className="main">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={pageSize}
            pagination
            rowsPerPageOption={[5, 10, 20]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowId={(row) => row.id || `${row.name}-${Math.random()}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
