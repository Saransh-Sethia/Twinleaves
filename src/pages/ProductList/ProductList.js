import React, { useState, useEffect } from "react";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import axios from "axios";
import icon from "../../assets/icon.png";
import bread from "../../assets/bread.png";
import "./ProductList.css";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import SortFilter from "../../components/SortFilter/SortFilter";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [sorting, setSorting] = useState([{ field: "mrp.mrp", sort: "asc" }]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()

  const performAPI = async () => {
    try {
      const response = await axios.get(
        `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${page + 1}`
      );
      const result = await response.data;
      console.log(result);
      let resultantArr = [];
      resultantArr.push(result);
      const res = resultantArr[0].products;
      const productsWithID = res.map((product, id) => ({
        ...product,
        id: id,
      }));
      setAllProducts(productsWithID || []);
      setTotalProducts(result.totalResults || 0);
      const cat = new Set(
        productsWithID.map((product) => product.main_category)
      );
      setCategories([...cat]);
      console.log("result", res);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    performAPI();
  }, [page]);

  useEffect(() => {
    let filteredProducts = allProducts
      .filter((product) => product.name && product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
      .filter(
        (product) =>
          selectedCategory === "" || product.main_category === selectedCategory
      );

    if (sorting.length > 0) {
      const { field, sort } = sorting[0];
      filteredProducts = filteredProducts.sort((a, b) => {
        const aa = field.split(".").reduce((o, i) => o[i], a) || 0;
        const bb = field.split(".").reduce((o, i) => o[i], b) || 0;

        if (sort === "asc") {
          return aa - bb;
        } else {
          return bb - aa;
        }
      });
    }

    setProducts(filteredProducts.slice(page* pageSize, (page + 1) * pageSize));
  }, [allProducts, selectedCategory, sorting, searchTerm, page]);

  const handleImageError = (e) => {
    e.target.src = bread;
  };

  const handlePage = (params) => {
    setPage(params.page)
  }

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
    setPage(0);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  const handleSortModelChange = (model) => {
    setSorting(model);
    setPage(0);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {state: {product}})
  };

  if(loading){
    return <h2>Loading...</h2>
  }

  if(error){
    return <h2>Error: {error.message}</h2>
  }

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
      <div className="content">
        <div className="sidebar">
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchTerm={handleSearchTerm}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            setSelectedCategory={setSelectedCategory}
          />
          <SortFilter
            sorting={sorting}
            setSorting={setSorting}
            handleSortModelChange={handleSortModelChange}
          />
        </div>
        <div className="main">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={pageSize}
              rowCount={totalProducts}
              pagination
              onPageChange={(params) => handlePage(params)}
              rowsPerPageOption={[5, 10, 20]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowId={(row) => row.id || `${row.name}-${Math.random()}`}
              onRowClick={(params)=>handleProductClick(params.row)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
