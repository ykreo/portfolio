import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// Импортируем все наши схемы
import work from './schemas/work'
import tagCategory from './schemas/tagCategory'
import tag from './schemas/tag'

export default defineConfig({
  name: 'default',
  title: 'Motion Portfolio Studio',

  projectId: 'v4dhclpw',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    // Регистрируем новые схемы здесь
    types: [work, tag, tagCategory],
  },
})
