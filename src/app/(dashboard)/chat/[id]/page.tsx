import React from 'react';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import { Chat } from '@/modules/chat/components';

interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = async ({ params }) => {
  const getCookieHeader = (): string =>
    cookies()
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join(';');
  const chat = await fetch(`${process.env.APP_HOST}/api/chats/${params.id}`, {
    cache: 'no-store',
    headers: { Cookie: getCookieHeader() },
  }).then((res) => res.json());

  return <Chat messages={chat.messages} />;
};

export default Page;
