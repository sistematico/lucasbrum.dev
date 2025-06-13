import Link from "next/link";
import { ThemeSwitch } from "@/components/theme";
import { metaData } from "@/config";

const navItems = {
  "/posts": { name: "Blog" },
  "/projetos": { name: "Projetos" },
  "/links": { name: "Links" },
  "/contato": { name: "Contato" }
};

export function Navbar() {
  return (
    <nav className="w-full lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {/* <Link href="/" className="text-3xl font-semibold"> */}
          <Link href="/" className="text-3xl font-semibold whitespace-nowrap">
            {metaData.title}
          </Link>
        </div>
        
        {/* Container com scroll limitado apenas à navbar */}
        <div className="relative w-full md:w-auto">
          <div className="navbar-scroll flex gap-3 md:ml-auto items-center pb-2 md:pb-0">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative whitespace-nowrap flex-shrink-0 py-1"
              >
                {name}
              </Link>
            ))}
            <div className="flex-shrink-0">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}