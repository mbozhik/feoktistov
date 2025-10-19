import configPromise from '@payload-config'

import {getPayload} from 'payload'

import AchievementsSlider from './AchievementsSlider'

export default async function Achievements() {
  const payload = await getPayload({config: configPromise})

  const achievements = await payload.find({
    collection: 'achievements',
    limit: 666,
    sort: 'queue',
  })

  return <AchievementsSlider achievements={achievements.docs} />
}
