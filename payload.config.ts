import {fileURLToPath} from 'url'
import path from 'path'
import sharp from 'sharp'

import {lexicalEditor} from '@payloadcms/richtext-lexical'
import {mongooseAdapter} from '@payloadcms/db-mongodb'
import {buildConfig} from 'payload'

import {Users} from '@payload/collections/Users'
import {Media} from '@payload/collections/Media'
import {Member} from '@payload/collections/Member'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Member],
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
