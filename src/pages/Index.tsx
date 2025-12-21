import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

const categories = [
  { name: 'Narayanpet Sarees', href: '/products?category=narayanpet', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop' },
  { name: 'Kanchipattu Sarees', href: '/products?category=kanchipattu', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop' },
  { name: 'Pure Silk Sarees', href: '/products?category=silk', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=500&fit=crop' },
  { name: 'Cotton Sarees', href: '/products?category=cotton', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=500&fit=crop' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-hero-pattern text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 motif-pattern opacity-20" />
        <div className="container-custom relative py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">Handcrafted with Love</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Timeless Elegance of Indian Handloom
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
              Discover exquisite handwoven sarees from master artisans of Narayanpet. 
              Each piece carries centuries of tradition and unmatched craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-2 gradient-gold" />
      </section>

      {/* Categories */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the rich heritage of Narayanpet to the royal splendor of Kanchipuram, 
              find your perfect saree.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg hover-lift"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-medium text-secondary uppercase tracking-wide">Our Heritage</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-6">
                The Art of Narayanpet Weaving
              </h2>
              <p className="text-muted-foreground mb-4">
                For generations, the weavers of Narayanpet have been creating masterpieces on their looms. 
                Their skilled hands transform threads into stories, weaving traditions that span centuries.
              </p>
              <p className="text-muted-foreground mb-6">
                Every Kanakambari saree is a testament to this rich heritage - featuring intricate temple 
                borders, traditional motifs, and the signature checks that make Narayanpet sarees 
                unmistakable.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">Learn More About Our Weavers</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=450&fit=crop"
                  alt="Traditional weaving"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 gradient-gold rounded-lg hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Start Your Saree Journey
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join our community and be the first to know about new collections, 
            exclusive offers, and the stories behind our sarees.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/products">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
