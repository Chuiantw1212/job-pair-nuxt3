export default defineSitemapEventHandler(async (e) => {
  const posts = await Promise.all([
    {
      _path: '/blog/post-a',
      modifiedAt: new Date(),
    },
    {
      _path: '/blog/post-b',
      modifiedAt: new Date(),
    },
    {
      _path: '/blog/post-c',
      modifiedAt: new Date(),
    },
  ]);
  return posts.map((p) => {
    return {
      loc: p._path,
      lastmod: p.modifiedAt,
    };
  });
});
