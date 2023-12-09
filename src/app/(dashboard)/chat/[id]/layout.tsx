import React from 'react';
import { Metadata, NextPage } from 'next';
import { cookies } from 'next/headers';
import { ChatLayout } from '@stn-ui/layout';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const getCookieHeader = (): string =>
    cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join(';');
  const chat = await fetch(`${process.env.APP_HOST}/api/chats/${params.id}`, {
    headers: { Cookie: getCookieHeader() },
  }).then((res) => res.json());

  return {
    title: `Chat: ${chat.title} `,
  };
};

const Layout: NextPage<LayoutProps> = async ({ children, params }) => {
  const getCookieHeader = (): string =>
    cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join(';');
  const chat = await fetch(`${process.env.APP_HOST}/api/chats/${params.id}`, {
    headers: { Cookie: getCookieHeader() },
  }).then((res) => res.json());
  return <ChatLayout title={chat.title}>{children}</ChatLayout>;
};

export default Layout;
