import { Github, Twitter, Facebook, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "/github", id: "github" },
  { icon: Twitter, href: "/twitter", id: "twitter" },
  { icon: Facebook, href: "/facebook", id: "facebook" },
  { icon: Instagram, href: "/instagram", id: "instagram" },
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Templates", "Pricing", "Enterprise", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Tutorials", "Blog", "Support Center", "API"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press Kit", "Contact", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Status", "Cookies"],
  },
];

export default function Footer() {
  return (
    <footer className="pt-12 pb-8 text-white bg-gray-900">
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-6 mb-12 md:flex-row">
          <h3 className="text-3xl font-bold tracking-tight">Evolution</h3>
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, id }) => (
              <a
                key={id}
                href={href}
                className="p-2 transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 md:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-lg font-semibold text-gray-300">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link}`}>
                    <a
                      href="#"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 border-t border-gray-700 md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Evolution. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
  