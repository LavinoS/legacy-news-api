export default async (dto) => {
  const { title, summary, slug, author, alt, file, category } = dto;

  return {
    title,
    summary,
    slug,
    author,
    type: 'news',
    featuredImageAlt: alt,
    featuredImage: file,
    status: 'draft',
    publishDate: '',
    sections: [],
    category
  };
}