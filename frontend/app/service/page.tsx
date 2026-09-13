import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { serviceItems, servicePlans } from "@/lib/data/page-data";

export default function Page() {
  return (
    <main className="container flex flex-col gap-14 py-10">
      <header className="mx-auto max-w-225 text-center">
        <span className="text-xs font-bold uppercase tracking-[1.4px] text-brand">
          What we do
        </span>
        <h1 className="mt-3 font-newsreader text-[clamp(34px,5vw,54px)] font-semibold leading-[1.1]">
          Editorial services that grow your audience
        </h1>
        <p className="mx-auto mt-4 max-w-150 text-base leading-[1.6] text-ink-2">
          From content strategy to custom theme builds, we help publishers and
          brands tell better stories — in English and বাংলা.
        </p>
      </header>
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {serviceItems.map(({ glyph, title, description }) => (
          <article
            key={title}
            className="flex flex-col rounded-card-lg border border-line bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-input bg-brand-tint font-newsreader text-2xl font-bold text-brand">
              {glyph}
            </span>
            <h2 className="mt-4.5 font-newsreader text-[21px] font-semibold">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-[1.6] text-ink-2">
              {description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand">
              Learn more <ChevronRight size={15} />
            </span>
          </article>
        ))}
      </section>
      <section>
        <div className="mb-8 text-center">
          <h2 className="font-newsreader text-3xl font-semibold">
            Simple pricing
          </h2>
          <p className="mt-2 text-[15px] text-ink-2">
            Pick a plan that fits your stage. No hidden fees.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePlans.map(({ name, price, features }, index) => (
            <article
              key={index}
              className={`rounded-card-lg border border-line p-7 ${index === 1 ? "bg-ink text-white" : "bg-white"}`}
            >
              <h2 className="font-newsreader text-2xl font-semibold">{name}</h2>
              <div className="mt-3 font-newsreader text-4xl font-bold">
                {price}
                <span className="ml-1 text-sm font-normal opacity-70">/mo</span>
              </div>
              <div className="mt-5 flex flex-col gap-2.5">
                {features.map((feature) => (
                  <span key={feature} className="flex gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                    {feature}
                  </span>
                ))}
              </div>
              <button
                className={`mt-6 w-full rounded-btn px-4 py-3 text-sm font-bold ${index === 1 ? "bg-brand text-white" : "border border-ink bg-white text-ink"}`}
              >
                {index === 1 ? "Choose Publisher" : "Get started"}
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-card-xl bg-linear-to-br from-brand to-brand-strong p-10 text-center text-white">
        <h2 className="font-newsreader text-3xl font-semibold">
          Ready to publish something great?
        </h2>
        <p className="mx-auto mt-3 max-w-130 text-[15.5px] leading-[1.6] text-white/90">
          Tell us about your project and we&apos;ll get back within one business
          day.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-btn bg-white px-7 py-3.5 text-[15px] font-bold text-ink no-underline hover:bg-ink hover:text-white"
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
