import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage): ParsedRequest {
  console.log('HTTP ' + req.url);
  const { pathname = '/', query = {} } = parse(req.url || '', true);
  const { readTime } = query;

  if (Array.isArray(readTime)) {
    throw new Error('Expected a single readTime');
  }

  const arr = pathname?.slice(1).split('.') ?? ['/'];
  let extension = '';
  let text = '';
  if (arr.length === 0) {
    text = '';
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join('.');
  }

  return {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    readTime: readTime || undefined,
  };
}
