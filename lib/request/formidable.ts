import { IncomingMessage } from 'node:http';
import { Readable } from 'node:stream';
import { Fields, Files, formidable } from 'formidable';
import { NextRequest } from 'next/server';
import { InternalServerErrorException, UnprocessableEntity } from '../handler/error';

const form = formidable({
  multiples: true,
  uploadDir: './public/uploads',
  keepExtensions: true,
  maxFileSize: 100 * 1024 * 1024, // 100MB
});

type ParsedFormData = {
  fields: Fields;
  files: Files;
};

export const extractFiles = async (req: NextRequest) => {
  try {
    // Get body as buffer
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

    // Parse with formidable - wrapped in promise
    const { files } = await new Promise<ParsedFormData>((resolve, reject) => {
      form.parse(mockReq, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    return files;
  } catch (error) {
    // Handle formidable-specific errors
    if (error instanceof Error) {
      // Check for common formidable errors
      if (error.message.includes('maxFileSize') || error.message.includes('maxFieldsSize')) {
        throw new UnprocessableEntity(`File upload error: ${error.message}`);
      }

      if (error.message.includes('Invalid content-type')) throw new UnprocessableEntity('Invalid content type for file upload');

      // Generic parsing errors
      throw new InternalServerErrorException(`Failed to parse form data: ${error.message}`);
    }

    // Unknown error type
    throw new InternalServerErrorException('An unexpected error occurred during file extraction');
  }
};
