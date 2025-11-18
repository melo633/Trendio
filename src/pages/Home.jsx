import React from "react";

import ProductGrid from "../components/ProductGrid";
import { useSelector } from "react-redux";
import { selectProductState } from "../store/features/productsSlice";
import FiltersBar from "../components/FilterBars";

const Home = () => {
  const { items } = useSelector(selectProductState);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">
          Seçilmiş məhsullar
        </h1>
        <p className="text-slate-600">
          "Seçdiyiniz məhsullar bir klik uzaqlıqda – rahat alış-verişin yeni
          ünvanı!"
        </p>
      </header>
      <FiltersBar />
      <ProductGrid key={items.length} />
    </div>
  );
};

export default Home;
