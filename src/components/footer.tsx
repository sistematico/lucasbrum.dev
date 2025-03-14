'use client'

import { FaXTwitter, FaGithub, FaInstagram, FaRss, FaLinkedinIn } from 'react-icons/fa6'
import { TbMailFilled } from 'react-icons/tb'
import { metaData, socialLinks } from '@/config'

const YEAR = new Date().getFullYear()

interface SocialLinkProps {
  href: string
  icon: React.ComponentType
}

function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  )
}

function SocialLinks() {
  return (
    <div className="social flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} />
      <a href="/sitemap.xml" target="_self">
        <FaRss />
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <small className="block text-[#1C1C1C] dark:text-[#D4D4D4]">
      <time>© {YEAR}</time> {metaData.name}
      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
      <SocialLinks />
    </small>
  )
}
