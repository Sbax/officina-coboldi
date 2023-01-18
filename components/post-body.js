export default function PostBody({ content }) {
  return <section dangerouslySetInnerHTML={{ __html: content }} lang="it" />;
}
