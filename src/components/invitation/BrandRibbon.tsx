export function BrandRibbon({ name }: { name: string | undefined }) {
  if (!name) return null;
  return (
    <aside className="brand-ribbon" aria-label={name}>
      <div className="brand-marquee" aria-hidden="true">
        {[0, 1].map((i) => (
          <span key={i}>
            {Array.from({ length: 4 }, (_, j) => (
              <span key={j}>
                {name}
                <span className="mx-8">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </aside>
  );
}
