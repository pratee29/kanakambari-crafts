import { Lightbulb } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    { name: "Development", active: true },
    { name: "Design", active: true },
    { name: "Communication", active: true },
    { name: "Business", active: true },
    { name: "Marketing", active: true },
    { name: "Leadership", active: false },
    { name: "Featured", active: false },
    { name: "Music & Arts", active: true },
    { name: "Trending", active: false },
    { name: "Technology", active: true },
  ];

  // Create a 3x6 grid with some empty cells
  const grid = [
    [null, "Development", null, "Design", null, "Communication"],
    ["Business", null, "Marketing", null, "Leadership", "Featured"],
    [null, "Music & Arts", null, null, "Trending", "Technology"],
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}

         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[#2A1E14] border border-orange-400/30 text-orange-400 font-semibold">
              📍 Categories
            </span>

            <p className="text-foreground/80 mt-4 text-lg">
            Explore skills across diverse categories
            </p>
          </div>

          <button className="px-7 py-2.5 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-400 transition">
            View all
          </button>
        </div>


        {/* Categories Grid */}
        <div className="rounded-3xl border border-border/30 bg-card/50 p-6 md:p-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {grid.flat().map((category, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  category
                    ? "border-primary/50 bg-gradient-to-br from-primary/20 to-primary/5 hover:border-primary hover:shadow-md"
                    : "border-border/30 bg-secondary/30"
                }`}
              >
                {category ? (
                  <span className="text-xs md:text-sm font-medium text-foreground text-center px-2">
                    {category}
                  </span>
                ) : (
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;