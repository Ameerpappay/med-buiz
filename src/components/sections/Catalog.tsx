import { useMemo, useState } from "react";
import { Search, Check, FileText } from "lucide-react";
import { CATEGORIES, PRODUCTS, CategoryId, categoryLabel } from "../../lib/products";
import { Button } from "../ui/Button";
import { useInquiry } from "../inquiry/InquiryContext";

interface Props {
  categoryFilter: CategoryId | "all";
  onCategoryChange: (category: CategoryId | "all") => void;
}

export function Catalog({ categoryFilter, onCategoryChange }: Props) {
  const [search, setSearch] = useState("");
  const { openInquiry } = useInquiry();

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, categoryFilter]);

  return (
    <section className="border-t border-slate-200 bg-ice py-20 sm:py-24">
      <div className="section-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-trust">
              Available Stock
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Product catalog
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Search current lines and request a quote. Specification sheets and batch documents
              are provided with every quote.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="input-field sm:w-60"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value as CategoryId | "all")}
              aria-label="Filter by category"
              className="input-field sm:w-56"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm font-medium text-slate-700">No products match your search.</p>
            <p className="mt-1 text-xs text-slate-500">
              Try a different term, or contact us — we source items beyond the listed catalog.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-40 items-center justify-center border-b border-slate-100 bg-gradient-to-br from-slate-50 to-ice">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-clinical shadow-sm">
                    <FileText className="h-7 w-7" aria-hidden />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {categoryLabel(product.category)}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {product.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 shrink-0 text-trust" aria-hidden />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between gap-3 pt-2">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => openInquiry(product.name)}
                    >
                      Request Quote
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-500">
          Looking for an item not listed here?{" "}
          <button
            onClick={() => openInquiry()}
            className="font-semibold text-clinical underline decoration-clinical/30 underline-offset-2 hover:text-blue-800"
          >
            Ask us — we source beyond this catalog.
          </button>
        </p>
      </div>
    </section>
  );
}
