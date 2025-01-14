export default async function handler(req, res) {
  const previousPage = req.headers.referer;

  if (req.preview) {
    res.clearPreviewData();
    res.writeHead(307, { Location: previousPage });
    res.end("Preview mode disabled");
    return;
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: previousPage });
  res.end("Preview mode enabled");
}
