const STATS = [
  { value: "4", label: "Product categories", detail: "Restorative, endodontics, impression, disposables" },
  { value: "24 h", label: "Quote response", detail: "Pricing and availability within one business day" },
  { value: "100%", label: "Documented supply", detail: "Batch records available on every order" },
];

export function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white py-14">
      <div className="section-container grid gap-10 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="sm:border-l sm:border-slate-200 sm:first:border-0 sm:first:pl-0 sm:pl-10">
            <p className="text-4xl font-semibold tracking-tight text-clinical">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{stat.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
