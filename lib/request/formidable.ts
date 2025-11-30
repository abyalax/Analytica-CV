import { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';
import { Fields, Files, formidable } from 'formidable';
import { NextRequest } from 'next/server';

const form = formidable({
  multiples: true,
  uploadDir: './public/uploads',
  keepExtensions: true,
  maxFileSize: 100 * 1024 * 1024, // 100MB
});

type ReturnPromise = Promise<{
  fields: Fields;
  files: Files;
}>;

export const extractFiles = async (req: NextRequest) => {
  // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <>
  const promiseExtract: ReturnPromise = new Promise(async (resolve, reject) => {
    try {
      // get body as buffer
      const arrayBuffer = await req.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Create Node.js readable stream
      const readable = Readable.from(buffer);

      // Mock IncomingMessage for headers that formidable needs
      const mockReq = Object.assign(readable, {
        headers: {
          'content-type': req.headers.get('content-type') || '',
          'content-length': req.headers.get('content-length') || buffer.length.toString(),
        },
        method: req.method,
        url: req.url,
      }) as IncomingMessage;

      // Parse with formidable
      form.parse(mockReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    } catch (error) {
      reject(error);
    }
  });

  const res = await promiseExtract;
  return res.files;
};
