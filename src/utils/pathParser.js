import path from 'path';

export default async (reqUrl, method = '') => {
  if (method === 'parse') {
    return path.parse(reqUrl).dir.slice(1);
  }

  return path.basename(reqUrl);
}