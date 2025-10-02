import {fileURLToPath} from 'url'
import path from 'path'
import sharp from 'sharp'

import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {mongooseAdapter} from '@payloadcms/db-mongodb'
import {buildConfig} from 'payload'

import {Members} from '@/payload/collections/Members'
import {Projects} from '@payload/collections/Projects'
import {News} from '@payload/collections/News'
import {Media} from '@payload/collections/Media'
import {Users} from '@payload/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Members, Projects, News, Media, Users],
  editor: lexicalEditor(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
