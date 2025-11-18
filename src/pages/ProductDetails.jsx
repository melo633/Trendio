import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  selectProductState,
  setSelectedProductFromList,
  clearSelectedProduct,
} from "../store/features/productsSlice";
import { addToCart } from "../store/features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const dispatch = useDispatch();
  const { items, selectedProduct, status, error } =
    useSelector(selectProductState);
  const productFromList = items.find((item) => item.id === numericId);
  const product = productFromList ?? selectedProduct;

  useEffect(() => {
    if (productFromList) {
      dispatch(setSelectedProductFromList(productFromList));
    } else {
      dispatch(fetchProductById(numericId));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, numericId, productFromList]);

  if (status === "loading" && !product) {
    return <p className="text-slate-500">Məhsul detalları yüklənir...</p>;
  }

  if (status === "failed" && !product) {
    return <p className="text-pink-600 font-medium">Xəta baş verdi: {error}</p>;
  }

  if (!product) {
    return (
      <p className="text-pink-600 font-medium">
        Bu məhsul mövcud deyil. Gəlin kataloqa geri dönək.
      </p>
    );
  }

  return (
    <section className="grid gap-8 lg:grid-cols-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-center bg-slate-100 rounded-xl p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-h-96 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="inline-block text-xs uppercase tracking-wider text-sky-600 font-semibold bg-sky-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-semibold text-slate-900 mt-3">
            {product.title}
          </h1>
        </div>
        <p className="text-slate-600 leading-relaxed">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-slate-900">
            \$ {product.price.toFixed(2)}
          </span>
          <span className="text-sm text-amber-500 font-medium">
            ★ {product.rating?.rate ?? "0"} ({product.rating?.count ?? 0} rəy)
          </span>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-auto inline-flex justify-center items-center bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-4 py-3 transition-colors"
        >
          Səbətə əlavə et
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
