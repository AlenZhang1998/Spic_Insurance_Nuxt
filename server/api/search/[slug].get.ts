import { getRouterParam } from 'h3';

import dataset from './dataset';

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing search item slug' });
  }

  const item = dataset.find((entry) => entry.slug === slug);
  if (!item) {
    throw createError({ statusCode: 404, statusMessage: 'Search item not found' });
  }

  return {
    title: item.title,
    content: `
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <p><a href="${item.to}">查看完整内容</a></p>
    `,
  };
});
