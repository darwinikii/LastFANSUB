export async function GET() {
    return new Response(Date.now())
  }

export async function HEAD() {
    return new Response(Date.now())
  }