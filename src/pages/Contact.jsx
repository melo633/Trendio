import React from "react";
const Contact = () => (
  <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900">Əlaqə</h1>
      <p className="text-slate-600">
        Sizinlə əməkdaşlıq etməyə sevinərik. Aşağıdakı kanallar vasitəsilə
        bizimlə əlaqə saxlayın.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border border-slate-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-slate-800">E-poçt</h2>
        <p className="text-sm text-slate-600 mt-2">hello@trendia.dev</p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-slate-800">Telefon</h2>
        <p className="text-sm text-slate-600 mt-2">+994 12 000 00 00</p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-slate-800">Sosial media</h2>
        <p className="text-sm text-slate-600 mt-2">
          Instagram, Twitter və LinkedIn hesablarımız:
          <br />
          @trendia
        </p>
      </div>
      <div className="border border-slate-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-slate-800">Ünvan</h2>
        <p className="text-sm text-slate-600 mt-2">
          123 Demo Street, Frontend City, Webland
        </p>
      </div>
    </div>
  </section>
);

export default Contact;
