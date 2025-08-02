import { client } from '$lib/sanityClient';

// URL вашего сайта
const siteUrl = 'https://your-domain.com'; // 👈 ЗАМЕНИТЕ НА ВАШ ДОМЕН

// Статические страницы
const staticPages = ['/', '/works'];

export async function GET() {
	// Получаем все работы из Sanity (без указания типа)
	const works = await client.fetch(`*[_type == "work"]{ _id, _updatedAt }`);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
		.map(
			(page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `
		)
		.join('')}
  
  ${works
		.map(
			(work: { _id: string; _updatedAt: string }) => `
    <url>
      <loc>${siteUrl}/works/${work._id}</loc>
      <lastmod>${new Date(work._updatedAt).toISOString()}</lastmod>
      <priority>0.6</priority>
    </url>
  `
		)
		.join('')}
</urlset>`;

	const headers = {
		'Content-Type': 'application/xml',
		'Cache-Control': 'max-age=0, s-maxage=3600' // Кэшируем на 1 час
	};

	return new Response(body, { headers });
}
