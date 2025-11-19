import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSummary,
  addToCart,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../store/features/cartSlice";
import { selectAuthState } from "../store/features/authSlice";
import { Link } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";
import SuccessModal from "../components/SuccessModal";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const summary = useSelector(selectCartSummary);
  const { isAuthenticated } = useSelector(selectAuthState);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const handleCheckoutSubmit = (formData) => {
    setCheckoutOpen(false);
    setSuccessData(formData);
    setSuccessOpen(true);
    dispatch(clearCart());
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setSuccessData(null);
  };

  if (!items.length) {
    return (
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Səbət hazırda boşdur</h2>
        <p className="text-slate-600 mb-4">
          Kataloqdan ürəyinizə yatanları seçin, sonra geri qayıdın. Bura sizin
          üçün açıq saxlanılıb!
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-4 py-2 transition-colors"
        >
          Məhsullara bax
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          {items.map(({ product, quantity }) => (
            <article
              key={product.id}
              className="flex gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
            >
              <div className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-800">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">
                  {product.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900">
                    $ {(product.price * quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(product.id))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => dispatch(addToCart(product))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="text-sm text-pink-600 hover:text-pink-700 font-medium  cursor-pointer"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-slate-900">
            Sifariş xülasəsi
          </h2>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Məhsul sayı</span>
            <span>{summary.totalQuantity}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-slate-900">
            <span>Ümumi</span>
            <span>$ {summary.totalPrice.toFixed(2)}</span>
          </div>

          {!isAuthenticated && (
            <p className="text-sm text-slate-500 bg-slate-100 border border-slate-200 rounded-xl p-3">
              Satınalma üçün əvvəlcə daxil olun.{" "}
              <Link to="/login" className="text-sky-600 font-medium">
                Daxil ol
              </Link>{" "}
              və ya{" "}
              <Link to="/register" className="text-sky-600 font-medium">
                Qeydiyyatdan keç
              </Link>
              .
            </p>
          )}

          <button
            onClick={() => setCheckoutOpen(true)}
            disabled={!isAuthenticated}
            className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-3 transition-colors font-medium ${
              isAuthenticated
                ? "bg-sky-500 hover:bg-sky-600 text-white"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            Satın almağa doğru!
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 py-2 font-medium transition-colors"
          >
            Səbəti təmizlə
          </button>
        </aside>
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={handleSuccessClose}
        summary={successData}
      />
    </>
  );
};

export default CartPage;
