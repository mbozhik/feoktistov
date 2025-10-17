import type {Member} from '@payload-types'
import {GRID_CONFIG} from '@/lib/constants'

import {cn} from '@/lib/utils'

import Division from '~/UI/Division'
import Card from '~~/team/Card'
import {H3, SMALL} from '~/UI/Typography'

export default function Grid({members}: {members: Member[]}) {
  return (
    <section data-section="grid-members">
      <Division token="division-grid-members" title="Команда" />

      {members.length > 0 ? (
        <div data-block="items-grid-members" className={cn(GRID_CONFIG, 'grid-cols-4 gap-8 xl:gap-6 sm:gap-4', 'p-12 xl:py-10 sm:p-2', '!divide-y-0')}>
          {members.map((member) => (
            <Card member={member} key={member.id} />
          ))}
        </div>
      ) : (
        <div data-block="empty-grid-members" className={cn('py-[20vh] sm:py-[15vh]', 'flex flex-col items-center justify-center gap-2', 'bg-background')}>
          <H3>{members.length > 0 ? 'Члены команды не найдены' : 'Члены команды отсутствуют'}</H3>

          <SMALL className="!text-base text-center max-w-md">{members.length > 0 ? 'Не отображаются члены команды. Видимо мы ещё не добавили их в систему. Мы работаем над этим!' : 'Члены команды скоро появятся! Мы активно работаем над интересными делами и обязательно поделимся кто ими занимается.'}</SMALL>
        </div>
      )}
    </section>
  )
}
