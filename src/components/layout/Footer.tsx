import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const navigation = {
  shop: [
    { name: 'Narayanpet Sarees', href: '/products?category=narayanpet' },
    { name: 'Kanchipattu Sarees', href: '/products?category=kanchipattu' },
    { name: 'Pure Silk Sarees', href: '/products?category=silk' },
    { name: 'Cotton Sarees', href: '/products?category=cotton' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Our Weavers', href: '/about#weavers' },
  ],
  support: [
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* Decorative border */}
      <div className="h-2 gradient-gold" />
      
      <div className="container-custom py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Kanakambari Loom Studio"
                className="h-14 w-14 rounded-full object-cover border-2 border-secondary"
              />
              <div>
                <h3 className="font-display text-2xl font-semibold">Kanakambari</h3>
                <p className="text-sm text-primary-foreground/70">Loom Studio</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-primary-foreground/80 max-w-md">
              Preserving the rich heritage of Indian handloom weaving. Each saree tells a story 
              of tradition, craftsmanship, and the skilled hands of our master weavers.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <a href="mailto:info@kanakambari.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                <Mail className="h-4 w-4" />
                info@kanakambari.com
              </a>
              <div className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Narayanpet, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Navigation sections */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary">Shop</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.shop.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-secondary">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-secondary">Support</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-secondary">Follow Us</h3>
                <div className="mt-4 flex gap-4">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-primary-foreground/70 hover:text-secondary transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-xs text-primary-foreground/60 text-center">
            &copy; {new Date().getFullYear()} Kanakambari Loom Studio. All rights reserved. 
            Celebrating the art of Indian handloom.
          </p>
        </div>
      </div>
    </footer>
  );
}
