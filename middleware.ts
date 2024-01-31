import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const publicRoutes = ['/sign-in'];
  const excludePattern = /^\/(?!api\/public|_next\/static|_next\/image|images|favicon.ico).*/;
  
  if (!excludePattern.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const isRootRoute = request.nextUrl.pathname === '/';
	const token = request.cookies.get('token')?.value;
  // console.log('Middleware Token :>>', token);

  if (isRootRoute || publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.searchParams.set('next', url.pathname);
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  // Verify token...
  const authResponse = await fetch(`${request.nextUrl.protocol}//${request.nextUrl.host}/api/public/validateToken?token=${token}`);

  if (!authResponse.ok) {
    const url = request.nextUrl.clone();
    url.searchParams.set('next', url.pathname);
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
