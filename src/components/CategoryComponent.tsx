"use client";

const categories = [
  { name: "MAN", image: "/herr.jpg" },
  { name: "TJEJ", image: "/kvinna.jpg" },
  { name: "NYHETER", image: "/nyheter.jpg" },
  { name: "OM VARG", image: "/om-varg.jpg" },
];

type Category = { name: string; image: string; position?: string };

function CategoryCard({ cat, alwaysActive = false }: { cat: Category; alwaysActive?: boolean }) {
  return (
    <div
      className={`relative cursor-pointer group transition-all duration-300 ease-in-out bg-gray-50 flex-shrink-0
        ${!alwaysActive ? "shadow-[0px_0px_20px_8px_rgba(0,0,0,0.25)] hover:-translate-y-4 hover:shadow-[12px_35px_60px_rgba(0,0,0,0.6)] hover:z-10" : ""}`}
      style={{ aspectRatio: "1/1", width: alwaysActive ? "75vw" : "auto" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: cat.position || "center" }}
        />
      </div>
      <div className={`absolute inset-0 transition-colors ${alwaysActive ? "bg-black/5" : "bg-black/10 group-hover:bg-black/5"}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`border-4 w-48 py-4 transition-all duration-200 ease-in-out flex items-center justify-center
          ${alwaysActive ? "border-orange-500" : "border-transparent group-hover:border-orange-500"}`}>
          <span className={`font-bold text-2xl tracking-widest transition-all duration-200 ease-in-out block
            ${alwaysActive ? "text-orange-500 translate-y-0" : "text-white translate-y-12 group-hover:text-orange-500 group-hover:translate-y-0"}`}>
            {cat.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CategoryComponent() {
  return (
    <>
      <div className="md:hidden w-full pt-6 pl-6 overflow-hidden">
        <div
          className="flex gap-3 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {categories.map((cat) => (
            <div key={cat.name} style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
              <CategoryCard cat={cat} alwaysActive />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-4 gap-2 w-full pt-10 px-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} cat={cat} />
        ))}
      </div>
    </>
  );
}