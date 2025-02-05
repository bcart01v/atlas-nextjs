interface Props {
  params: {
    id: string;
  };
}

export default function TopicPage({ params }: Props) {
  return (
    <main>
      <h1>Topic {params.id}</h1>
      <p>Displaying questions related to this topic.</p>
    </main>
  );
}