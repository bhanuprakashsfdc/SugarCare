import { recipes, recipeCategories, recipeTags } from '@/data/recipes';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const tag = searchParams.get('tag') || '';
  const giMax = parseInt(searchParams.get('giMax') || '100', 10);

  let filtered = [...recipes];

  if (category !== 'all') {
    filtered = filtered.filter(r => r.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some(ing => ing.item.toLowerCase().includes(q))
    );
  }

  if (tag) {
    filtered = filtered.filter(r => r.tags.includes(tag));
  }

  if (giMax < 100) {
    filtered = filtered.filter(r => r.giIndex <= giMax);
  }

  return Response.json({
    success: true,
    data: filtered,
    meta: {
      total: filtered.length,
      categories: recipeCategories,
      tags: recipeTags,
    },
  });
}
