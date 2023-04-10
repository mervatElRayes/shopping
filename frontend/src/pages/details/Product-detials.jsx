import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOneProductQuery } from "Redux/ProductsApi";
import DetailsThumb from "./DetailsThumb";
import "./Product-detials.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/CartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const ProductDetials = () => {
  const dispatch = useDispatch();
  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );

  let { id } = useParams();
  // data ==> Only one product
  const { data, error, isLoading } = useGetOneProductQuery(id);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);
  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const productQuantity = (itemFromApi) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemFromApi.id;
    });

    return myProduct.quantity;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }

  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2 style={{ fontSize: "29px" }}>{data.productName}</h2>
              <span style={{ fontSize: "19px" }}>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}
            <p style={{ fontSize: "15px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
            <p style={{ fontSize: "18px" }}>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {/* <button className="cart">Add to cart</button> */}

            {selectedProductsID.includes(data.id) ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "33px",
                }}
              >
                <IconButton
                  color="primary"
                  sx={{ mr: "10px" }}
                  aria-label=""
                  onClick={() => {
                    dispatch(decreaseQuantity(data));
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>

                <StyledBadge
                  badgeContent={productQuantity(data)}
                  color="primary"
                />
                <IconButton
                  color="primary"
                  sx={{ ml: "10px" }}
                  aria-label=""
                  onClick={() => {
                    dispatch(increaseQuantity(data));
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <Button
                sx={{
                  marginTop: "33px",
                  textTransform: "capitalize",
                  p: 1,
                  lineHeight: 1.1,
                }}
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(addToCart(data));
                }}
              >
                <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetials;
