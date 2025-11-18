import React from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductState,
} from "../store/features/productsSlice";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const { status, error } = useSelector(selectProductState);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <p className="text-slate-500">
        Məhsullar yüklənir... Bu arada özünüzə bir fincan çay süzün. ☕️
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p className="text-pink-600 font-medium">
        Ups! Məhsulları yükləmək mümkün olmadı: {error}
      </p>
    );
  }

  if (!products.length) {
    return (
      <p className="text-slate-500">
        Filtrə uyğun məhsul tapılmadı. Gəlin filtr seçimlərinə bir daha baxaq.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
