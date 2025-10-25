'use client'

import LogoInvertedIcon from '$/logo-inverted.svg'
import {ArrowUpRight} from 'lucide-react'

import {cn} from '@/lib/utils'

import {useState} from 'react'
import {usePathname} from 'next/navigation'
import {useForm} from 'react-hook-form'

import Link from 'next/link'
import Image from 'next/image'
import {H1, SMALL, TYPO_CLASSES} from '~/UI/Typography'

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

export type FormFields = {
  name: string
  phone: string
  email: string
  message: string
}

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState('Отправить форму')

  const {register, handleSubmit, reset} = useForm<FormFields>()
  const pathname = usePathname()

  const isHomePage = pathname === '/'

  const onSubmit = async (data: FormFields) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data}),
      })

      if (!response.ok) {
        throw new Error('Failed to send data')
      }

      await response.json()
      setButtonText('Форма отправлена')
      reset()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setButtonText('Отправить форму')
      }, 1500)
    }
  }

  const INPUT_CLASSES = cn(TYPO_CLASSES.small, 'py-2', 'block w-full outline-none border-b', isHomePage ? 'text-background-gray placeholder:text-background-gray/40 border-background-gray/40 focus:border-background-gray' : 'text-blue-dark placeholder:text-blue-dark/40 border-blue-dark/40 focus:border-blue-dark')

  return (
    <footer id="contacts" className={cn('border-x', !isHomePage ? 'bg-background' : 'bg-blue-dark')}>
      <div data-block="form-footer" className={cn('p-24 xl:p-14 sm:px-2 sm:py-4', 'grid grid-cols-2 sm:grid-cols-1 sm:gap-6 sm:mb-4')}>
        <H1 className={cn('font-normal', !isHomePage ? 'text-blue-dark' : 'text-gray')}>
          Свяжитесь <br /> с нами
        </H1>

        <form className="flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col h-full gap-7 xl:gap-6 sm:gap-5">
            <input type="text" className={INPUT_CLASSES} placeholder="Ваше имя" {...register('name', {required: true})} />

            <input type="tel" className={INPUT_CLASSES} placeholder="Номер телефона" {...register('phone', {required: true})} />

            <input type="email" className={INPUT_CLASSES} placeholder="Электронная почта" {...register('email', {required: true})} />

            <textarea rows={2} className={INPUT_CLASSES} placeholder="Чем я могу помочь?" {...register('message')} />

            <button type="submit" disabled={isSubmitting} className={cn('w-full py-3 xl:py-2.5 sm:py-2', 'flex items-center justify-center gap-2', 'cursor-pointer group duration-300', !isHomePage ? 'border border-blue-dark text-blue-dark hover:bg-blue-dark/10' : 'border border-background-gray text-background-gray hover:bg-background-gray/10', isSubmitting ? (!isHomePage ? 'bg-blue-dark/15' : 'bg-background-gray/5') : '')}>
              <SMALL>{isSubmitting ? 'Отправка...' : buttonText}</SMALL>
              <ArrowUpRight className={cn('size-6', 'mt-0.5 -translate-x-1 group-hover:-translate-x-0.5 duration-300', isSubmitting && 'animate-pulse')} strokeWidth={1.5} />
            </button>
          </div>
        </form>
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
              <Link href={item.href} className={cn('block w-fit', 'border-b border-transparent hover:border-background-gray duration-300')} key={item.href}>
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
