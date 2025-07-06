"use client";

import React from "react";
import { FaXTwitter, FaGithub, FaRss } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { site, socialLinks } from "@/config";

const YEAR = new Date().getFullYear();

type SocialLinkProps = {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <a href="/rss.xml" target="_self">
        <FaRss />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="lg:mt-20 mt-12 text-[#1C1C1C] dark:text-[#D4D4D4] w-full">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between w-full">
        <small className="text-center sm:text-left w-full sm:w-auto">
          <time>© {YEAR}</time>{" "}
          <a
            className="no-underline"
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.title}
          </a>
        </small>
        <style jsx>{`
          @media screen and (max-width: 480px) {
            article {
              padding-top: 2rem;
              padding-bottom: 4rem;
            }
          }
        `}</style>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
