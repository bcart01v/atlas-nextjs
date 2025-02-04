import { useRouter } from 'next/navigation';

export default function TopicPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Topic {params.id}</h1>
      <p>Displaying questions related to this topic.</p>
    </main>
  );
}