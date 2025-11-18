import React from "react";
const faqItems = [
  {
    question: "Sifarişimi necə izləyə bilərəm?",
    answer:
      "Sifarişinizi hesabınıza daxil olaraq və ya göndərilən təsdiq e-mailindəki link vasitəsilə izləyə bilərsiniz.",
  },
  {
    question: "Məhsulları dəyişmək və ya qaytarmaq mümkündürmü?",
    answer:
      "Bəli, məhsulu aldığınız tarixdən etibarən 14 gün ərzində dəyişmək və ya qaytarmaq mümkündür.",
  },
  {
    question: "Çatdırılma haqqı nə qədərdir?",
    answer:
      "Çatdırılma haqqı sifarişin miqdarına və ünvanınıza görə dəyişir. Ətraflı məlumat üçün çatdırılma bölməsinə baxın.",
  },
  {
    question: "Məhsullar zəmanətlə gəlirmi?",
    answer: "Bütün məhsullar istehsalçı zəmanəti ilə təmin olunur.",
  },
  {
    question: "Ödəniş üsulları hansılardır?",
    answer: "Biz kart, onlayn bank köçürməsi və nağd ödəniş qəbul edirik.",
  },
];

const FAQ = () => (
  <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
    <div>
      <h1 className="text-3xl font-semibold text-slate-900">
        Tez-tez verilən suallar
      </h1>
      <p className="text-slate-600">
        Suallarına cavab tapmadınsa, Support səhifəsinə göz at və ya bizimlə
        əlaqə saxla.
      </p>
    </div>
    <div className="space-y-4">
      {faqItems.map((item) => (
        <details
          key={item.question}
          className="border border-slate-200 rounded-xl p-4"
        >
          <summary className="text-lg font-semibold text-slate-800 cursor-pointer">
            {item.question}
          </summary>
          <p className="text-slate-600 mt-2">{item.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FAQ;
