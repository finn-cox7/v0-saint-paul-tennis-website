import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/lib/env'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.supabase.url,
    env.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/member-portal', '/board-portal']
  const boardRoutes = ['/board-portal']

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isBoardRoute = boardRoutes.some((route) => pathname.startsWith(route))

  // Redirect to login if not authenticated
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // For board routes, check if user has appropriate role
  if (isBoardRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const allowedRoles = ['staff', 'board', 'admin']
    if (!profile || !allowedRoles.includes(profile.role)) {
      const url = request.nextUrl.clone()
      url.pathname = '/member-portal'
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/auth/login', '/auth/register']
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/member-portal'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
