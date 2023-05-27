export default async (dto) => {
  const { title, summary, slug, author, type, alt, file } = dto;

  return {
    title: title,
    summary: summary,
    slug: slug,
    author: author,
    type: type,
    featuredImageAlt: alt,
    featuredImage: file,
    status: 'draft',
    publishDate: ''
  };
}