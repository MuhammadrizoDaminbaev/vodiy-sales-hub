import { Section } from "./ScrollReveal";
import { ImageIcon } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

// Add more images here as needed
const images = [
  gallery1,
  gallery2,
  // Placeholder slots for more images
  null, null, null, null,
];

export default function GallerySection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <Section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
          <span className="text-gradient-gold">Loyiha</span> ko'rinishi
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) =>
            src ? (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                <img
                  src={src}
                  alt={`Jahon Bozori ko'rinishi ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl glass-card flex flex-col items-center justify-center gap-2 text-muted-foreground"
              >
                <ImageIcon className="w-10 h-10" />
                <span className="text-sm">Rasm qo'shiladi</span>
              </div>
            )
          )}
        </div>
      </Section>
    </section>
  );
}
