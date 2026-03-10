import client from '../tina/__generated__/client';
import ClientPage from './client-page';

export default async function HomePage() {
  const res = await client.queries.page({ relativePath: 'home.md' });
  return <ClientPage {...res} />;
}