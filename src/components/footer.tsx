'use client'

import { FaXTwitter, FaGithub, FaInstagram, FaRss, FaLinkedinIn } from 'react-icons/fa6'
import { TbMailFilled } from 'react-icons/tb'
import { site, social } from '@/config'

const YEAR = new Date().getFullYear()

interface SocialLinkProps {
  href: string
  icon: React.ComponentType
  className?: string
}

function SocialLink({ href, icon: Icon, className }: SocialLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <Icon />
    </a>
  )
}

function SocialLinks() {
  return (
    <div className="social flex text-lg gap-3.5 float-right">
      <SocialLink href={social.twitter} icon={FaXTwitter} className="x" />
      <SocialLink href={social.github} icon={FaGithub} className="github" />
      <SocialLink href={social.instagram} icon={FaInstagram} className="instagram" />
      <SocialLink href={social.linkedin} icon={FaLinkedinIn} className="linkedin" />
      <SocialLink href={social.email} icon={TbMailFilled} className="email" />
      <a href="/sitemap.xml" target="_self" className="rss">
        <FaRss />
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <small className="block text-[#1C1C1C] dark:text-[#D4D4D4]">
      <time>© {YEAR}</time> {site.name}
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
