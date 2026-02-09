import { NextRequest, NextResponse } from 'next/server';

// 1. Define the dynamic params type
type Props = {
  params: Promise<{ path: string[] }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  // 2. Destructure the path array (Next.js provides an array for catch-all)
  const { path } = await params; 
  
  // Example: if the URL is /api/data/orders/123, path is ["orders", "123"]
  const resource = path[0]; 
  const id = path[1];

  // 3. Handle Authentication (Checking for your Bearer token)
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 4. Logic to fetch data from MongoDB (using your existing logic)
    // const data = await db.collection(resource).findOne({ _id: id });
    
    return NextResponse.json({ 
      message: `Serving ${resource} data`,
      receivedPath: path,
      data: { id, status: "processed" }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}