import React from "react";
const Support = () => (
  <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900">Dəstək Mərkəzi</h1>
      <p className="text-slate-600">
        Sualınız varsa, sənə kömək etmək üçün buradayıq. Ən populyar mövzular
        üçün aşağıdakı resurslara baxın.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border border-slate-200 rounded-xl p-4 hover:border-sky-300 transition-colors">
        <h2 className="text-lg font-semibold text-slate-800">
          Göndərilmə və çatdırılma
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Sifarişinizin statusunu izləmək üçün sifariş ID və e-poçt ünvanınızı
          daxil edin.
        </p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4 hover:border-sky-300 transition-colors">
        <h2 className="text-lg font-semibold text-slate-800">
          Geri qaytarma siyasəti
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Gadget-lar üçün 14, geyim üçün 30 gün pulsuz geri qaytarma hüququndan
          yararlan.
        </p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4 hover:border-sky-300 transition-colors">
        <h2 className="text-lg font-semibold text-slate-800">
          Ödəniş problemləri
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Bir neçə dəqiqə içində ödənişi təsdiqləmək üçün kartınızdan test
          əməliyyat istifadə olunur.
        </p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4 hover:border-sky-300 transition-colors">
        <h2 className="text-lg font-semibold text-slate-800">Texniki dəstək</h2>
        <p className="text-sm text-slate-600 mt-2">
          Trendia, təhlükəsizlik və inteqrasiya ilə bağlı suallar üçün
          dev@trendia.dev ünvanından yazın.
        </p>
      </div>
    </div>
  </section>
);

export default Support;
