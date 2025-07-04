"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaRss,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "@/config";

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
    // <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
    // <div className="flex text-lg gap-3.5 transition-opacity duration-300 hover:opacity-90">
    // <div className="flex text-lg gap-3.5 transition-opacity duration-300 hover:opacity-90 justify-center sm:justify-end">
    <div className="flex text-lg gap-3.5 transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      {/* <SocialLink href={socialLinks.instagram} icon={FaInstagram} /> */}
      {/* <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} /> */}
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <a href="/rss.xml" target="_self">
        <FaRss />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    // <footer className="lg:mt-20 mt-12 text-[#1C1C1C] dark:text-[#D4D4D4]">
    // <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:items-center">
    // {/* <small className="block lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]"> */}
    // <footer className="lg:mt-20 mt-12 text-[#1C1C1C] dark:text-[#D4D4D4]">
    //   <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
    //     <small className="text-center sm:text-left">
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
            {metaData.title}
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
        {/* </small> */}
      </div>
    </footer>
  );
}
