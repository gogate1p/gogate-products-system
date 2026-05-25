const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

async function getSliders() {
  try {
    const res = await fetch(`${API}/cms/sliders`, { next: { revalidate: 120 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function HeroSlider() {
  const sliders = await getSliders();
  const slides =
    sliders[0]?.slides ||
    [
      {
        image: 'https://images.unsplash.com/photo-1559188197-4f761a469ab2?w=1400',
        caption: 'Farm-fresh Alphonso mangoes',
      },
      {
        image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1400',
        caption: 'Premium cashews — W320',
      },
    ];

  return (
    <section className="hero-slider">
      <div className="slider-track">
        {slides.map((s: { image: string; caption?: string }, i: number) => (
          <div key={i} className="slide" style={{ backgroundImage: `url(${s.image})` }}>
            <div className="container slide-caption">
              <h1>{s.caption || 'Gogate Products'}</h1>
              <p>Mangoes · Cashews · Dry fruits — gogateproducts.store</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
