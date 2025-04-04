'use client'

import { FaXTwitter, FaGithub, FaInstagram, FaRss, FaLinkedinIn } from 'react-icons/fa6'
import { TbMailFilled } from 'react-icons/tb'
import { site, social } from '@/config'
import { usePlayer } from '@/contexts/audio'
import { Station } from '@/types'
import { stations } from '@/data/stations'

const YEAR = new Date().getFullYear()

interface SocialLinkProps {
  href: string
  icon: React.ComponentType
  className?: string
}

function SocialLink({ href, icon: Icon, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Icon />
    </a>
  )
}

function SocialLinks() {
  return (
    <div className="social flex text-lg gap-3.5 float-right">
      <SocialLink href={social.twitter} icon={FaXTwitter} className="x" />
      <SocialLink href={social.github} icon={FaGithub} className="github" />
      <SocialLink
        href={social.instagram}
        icon={FaInstagram}
        className="instagram"
      />
      <SocialLink
        href={social.linkedin}
        icon={FaLinkedinIn}
        className="linkedin"
      />
      <SocialLink href={social.email} icon={TbMailFilled} className="email" />
      <a href="/sitemap.xml" target="_self" className="rss">
        <FaRss />
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <>
      <Player />
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
    </>
  )
}

// Estações definidas localmente nesta página
// const stations: Station[] = [
//   {
//     id: 1,
//     name: 'Estação Rock',
//     genre: 'Rock',
//     streamUrl: 'https://example.com/rock-stream',
//     logo: '/rock.png'
//   },
//   {
//     id: 2,
//     name: 'Estação Jazz',
//     genre: 'Jazz',
//     streamUrl: 'https://example.com/jazz-stream',
//     logo: '/jazz.png'
//   },
//   {
//     id: 3,
//     name: 'Estação Pop',
//     genre: 'Pop',
//     streamUrl: 'https://example.com/pop-stream',
//     logo: '/pop.png'
//   }
// ]

function Player() {
  const { play, currentStation, isPlaying } = usePlayer()

  return (
    <main className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-3xl font-bold mb-8">Estações de Rádio</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <div
            key={station.id}
            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition ${
              currentStation?.id === station.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200'
            }`}
            onClick={() => play(station)}
          >
            <div className="flex items-center">
              <img
                src={station.logo || '/default-station.png'}
                alt={station.name}
                className="w-16 h-16 rounded-lg mr-4"
              />
              <div>
                <h2 className="font-bold text-lg">{station.name}</h2>
                <p className="text-gray-600">{station.genre}</p>
                {currentStation?.id === station.id && (
                  <p className="text-red-600 text-sm mt-1">
                    {isPlaying ? '▶ Reproduzindo' : '❚❚ Pausado'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
