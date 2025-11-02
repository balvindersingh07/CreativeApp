import { Instagram, MessageCircle, Youtube, Heart } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Company: ["About Us", "Our Story", "Team", "Careers"],
    Support: ["Contact", "Help Center", "FAQ", "Volunteer"],
    Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Guidelines"],
    Community: ["Blog", "Success Stories", "Events Calendar", "Newsletter"],
  };

  return (
    <footer className="bg-[var(--boho-brown)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--boho-terracotta)] to-[var(--boho-orange)] flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M8 10C6.34315 10 5 11.3431 5 13C5 14.6569 6.34315 16 8 16C9.65685 16 11 14.6569 11 13C11 11.3431 9.65685 10 8 10Z"
                    fill="white"
                    opacity="0.7"
                  />
                  <path
                    d="M13 13C13 11.3431 14.3431 10 16 10C17.6569 10 19 11.3431 19 13C19 14.6569 17.6569 16 16 16C14.3431 16 13 14.6569 13 13Z"
                    fill="white"
                    opacity="0.7"
                  />
                  <path
                    d="M9 18C9 16.3431 10.3431 15 12 15C13.6569 15 15 16.3431 15 18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18Z"
                    fill="white"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <span className="font-['Playfair_Display']">CraftConnect</span>
            </div>
            <p className="text-white/70 mb-6">
              Connecting creative souls with opportunities to shine.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-8">
          <div className="h-px bg-white/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--boho-brown)] px-4">
            <svg
              width="60"
              height="20"
              viewBox="0 0 60 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5,10 Q15,5 25,10 T45,10 T55,10"
                stroke="white"
                strokeWidth="2"
                opacity="0.3"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/60">
          <p>© 2025 CraftConnect. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart size={16} className="text-[var(--boho-terracotta)]" fill="var(--boho-terracotta)" />
            <span>for creative entrepreneurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}



