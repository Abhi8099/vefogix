import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedPaths = [
    '/all-publisher-sites/',
    '/auth/',
    '/blacklisted-sites/',
    '/buyer-add-funds/',
    '/buyer-dashboard/',
    '/buyer-orders/',
    '/FAQ/',
    '/favorite-sites/',
    '/invoices/',
    '/profile/',
    '/project-publisher-site/',
    '/projects/',
    '/publisher-dashboard/',
    '/publisher-guestpost-tasks/',
    '/publisher-my-platform/',
    '/publisher-task-view/',
    '/support-tickets/',
    '/tables/',
    '/task-create/',
    '/ticket-details/',
    '/ui-elements/',
    '/update-owner/',
    '/verified-websites/'
  ];



  const authPaths = ['/signin/', '/signup/'];


  const token = request.cookies.get('login_access_token');

  if (protectedPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL('/signin/', request.nextUrl));
  }

  if (authPaths.includes(path) && token) {
    return NextResponse.redirect(new URL('/buyer-dashboard/', request.nextUrl));
  }


  return NextResponse.next();
}

export const config = {
  matcher:  [
    '/',
    '/all-publisher-sites',
    '/auth',
    '/blacklisted-sites',
    '/buyer-add-funds',
    '/buyer-dashboard',
    '/buyer-orders',
    '/FAQ',
    '/favorite-sites',
    '/invoices',
    '/profile',
    '/project-publisher-site',
    '/projects',
    '/publisher-dashboard',
    '/publisher-guestpost-tasks',
    '/publisher-my-platform',
    '/publisher-task-view',
    '/signin',
    '/signup',
    '/support-tickets',
    '/tables',
    '/task-create',
    '/ticket-details',
    '/ui-elements',
    '/update-owner',
    '/verified-websites'
  ]
};
