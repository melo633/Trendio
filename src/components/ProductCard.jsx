import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/features/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col">
      <Link
        to={`/product/${product.id}`}
        className="flex-1 flex flex-col items-center text-center gap-4"
      >
        <div className="h-48 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>
        <h3 className="text-sm font-semibold text-slate-700 h-10 overflow-hidden">
          {product.title}
        </h3>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">
          $ {product.price.toFixed(2)}
        </span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg px-3 py-2 transition-colors"
        >
          Səbətə at
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
