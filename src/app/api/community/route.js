import { communityPosts, expertQnA } from '@/data/healthData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'posts';
  const tag = searchParams.get('tag') || '';

  if (type === 'qna') {
    let data = [...expertQnA];
    if (tag) data = data.filter(q => q.tags.includes(tag));
    return Response.json({ success: true, data, type: 'qna' });
  }

  let data = [...communityPosts];
  if (tag) data = data.filter(p => p.tags.includes(tag));

  return Response.json({ success: true, data, type: 'posts' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, ...postData } = body;

    const newPost = {
      id: `${type}-${Date.now()}`,
      ...postData,
      likes: 0,
      replies: 0,
      timestamp: new Date().toISOString(),
      verified: false,
    };

    return Response.json({ success: true, data: newPost }, { status: 201 });
  } catch {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
