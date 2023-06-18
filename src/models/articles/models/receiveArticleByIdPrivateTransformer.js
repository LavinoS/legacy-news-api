export default async (dto) => {
  const {
    title,
    summary,
    slug,
    author,
    type,
    featuredImageAlt,
    featuredImage,
    status,
    _id,
    sections,
    publishDate,
    category
  } = dto;

  return {
    id: _id,
    title: title,
    summary: summary,
    slug: slug,
    author: author,
    type: type,
    alt: featuredImageAlt,
    featuredImage: featuredImage,
    status: status,
    sections: sections,
    publishDate: publishDate,
    category: category
  };
}