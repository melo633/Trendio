import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProductState,
  setSearchTerm,
  setSelectedCategory,
  setSortOption,
} from "../store/features/productsSlice";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedCategory, sortOption, categories } =
    useSelector(selectProductState);

  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1">
          <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
            Axtarış
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
            placeholder="Məhsul adı yazın..."
            className="w-full rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-sky-500 px-3 py-2 text-sm bg-slate-50"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
            Kateqoriya
          </label>
          <select
            value={selectedCategory}
            onChange={(event) =>
              dispatch(setSelectedCategory(event.target.value))
            }
            className="rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-sky-500 px-3 py-2 text-sm bg-slate-50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "Hamısı" : category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
            Sırala
          </label>
          <select
            value={sortOption}
            onChange={(event) => dispatch(setSortOption(event.target.value))}
            className="rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-sky-500 px-3 py-2 text-sm bg-slate-50"
          >
            <option value="default">Standart</option>
            <option value="price-asc">Qiymət (Aşağıdan yuxarı)</option>
            <option value="price-desc">Qiymət (Yuxarıdan aşağı)</option>
            <option value="rating-desc">Reytinq (Yüksək)</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FiltersBar;
