// sanity-studio/schemas/work.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ru', type: 'string', title: 'Russian'},
        {name: 'ua', type: 'string', title: 'Ukrainian'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en', // Генерировать slug из английского заголовка
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Video', value: 'video'},
          {title: 'Static', value: 'static'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'ru', type: 'text', title: 'Russian'},
        {name: 'ua', type: 'text', title: 'Ukrainian'},
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}], // <-- Указываем, что теперь это массив ссылок на теги
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true, // Позволяет кадрировать изображение
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentUrl',
      title: 'Content (Video or Full Image)',
      description: 'Upload a video file or a full-size static image here.',
      type: 'file', // 'file' подходит для видео и изображений
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'thumbnailUrl',
    },
  },
})
