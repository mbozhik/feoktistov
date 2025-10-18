'use client'

import LogoInvertedIcon from '$/logo-inverted.svg'

import {cn} from '@/lib/utils'

import {usePathname} from 'next/navigation'

import Link from 'next/link'
import Image from 'next/image'
import {H1, SMALL} from '~/UI/Typography'

const LINKS = {
  main: [
    {
      label: 'Услуги',
      href: '/projects',
    },
    {
      label: 'Новости',
      href: '/news',
    },
    {
      label: 'Команда',
      href: '/team',
    },
  ],
  contacts: [
    {
      label: 'info@flaw.ru',
      href: 'mailto:info@flaw.ru',
    },
    {
      label: '+7 (499) 951-17-44',
      href: 'tel:+74999511744',
    },
  ],
  location: [
    {
      label: 'Москва, Последний переулок, 6к1',
      href: 'https://yandex.ru/maps/-/CLVKmKID',
    },
  ],
  socials: [
    {
      label: 'Telegram',
      href: 'https://t.me/flaw_ru',
    },
    {
      label: 'Vkontakte',
      href: 'https://vk.com/flaw_ru',
    },
  ],
}

export default function Footer() {
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  return (
    <footer className={cn('border-x', !isHomePage ? 'bg-background' : 'bg-blue-dark')}>
      <div data-block="form-footer" className={cn('p-24 xl:p-14 sm:px-2 sm:py-4', 'grid grid-cols-2 sm:grid-cols-1')}>
        <H1 className={cn('font-normal', !isHomePage ? 'text-blue-dark' : 'text-gray')}>
          Свяжитесь <br /> с нами
        </H1>
      </div>

      <div data-block="links-footer" className={cn('px-24 py-12 xl:px-14 xl:py-6 sm:px-2 sm:py-4', 'grid grid-cols-4 sm:grid-cols-1 gap-6 xl:gap-10 sm:gap-6', 'border-t', !isHomePage ? 'border-gray' : 'border-transparent')}>
        {Object.entries(LINKS).map(([key, value]) => (
          <div className="space-y-3 sm:space-y-2" key={key}>
            {[key === 'contacts', key === 'location', key === 'socials'].includes(true) && (
              <SMALL offset={0} className={cn('font-semibold', !isHomePage ? 'text-blue-dark' : 'text-gray')}>
                {key === 'contacts' ? 'Контакты' : key === 'location' ? 'Адрес' : 'Соц. сети'}
              </SMALL>
            )}

            {value.map((item) => (
              <Link href={item.href} className="block" key={item.href}>
                <SMALL offset={0} className={cn(!isHomePage ? 'text-blue-dark' : 'text-gray')}>
                  {item.label}
                </SMALL>
              </Link>
            ))}

            {key === 'location' && (
              <>
                <SMALL offset={0} className={cn(!isHomePage ? 'text-blue-dark' : 'text-gray')}>
                  Пн-Пт с 9:00 до 19:00
                </SMALL>{' '}
                <SMALL offset={0} className={cn(!isHomePage ? 'text-blue-dark' : 'text-gray')}>
                  Сб-Вс с 10:00 до 16:00
                </SMALL>
              </>
            )}
          </div>
        ))}
      </div>

      <div data-block="end-footer" className={cn('px-24 py-6 xl:px-14 xl:py-8 sm:px-2 sm:py-4', 'flex sm:flex-col-reverse items-end justify-between sm:items-start sm:gap-3')}>
        <SMALL className="text-base xl:text-sm text-gray-blue" offset={0}>
          Все права защищены (с)
        </SMALL>

        <Image className="w-[425px] xl:w-[300px] sm:w-[250px]" src={LogoInvertedIcon} alt="логотип феоктистова инвертированный" />
      </div>
    </footer>
  )
}
