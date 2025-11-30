import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { TResponse } from '~/common/types/response';
import { CV } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';
import { extractFiles } from '~/lib/request/formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<CV>>> => {
  try {
    const { files } = await extractFiles(req);

    const uploadedFiles: string[] = [];

    // Pastikan folder uploads ada
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    for (const file of files ?? []) {
      if (!file) continue;

      const newPath = path.join(uploadsDir, file.originalFilename ?? `${new Date().toString}`);
      fs.renameSync(file.filepath, newPath);
      // todo: upload ke cloud or whatever next plan development
      uploadedFiles.push(`/uploads/${file.originalFilename ?? `${new Date().toString}`}`);
    }

    // todo: extract file cv and store data extracted to db

    const data: CV = {
      id: 0,
      name: '',
      email: '',
      userId: 0,
      address: '',
      linkedin: null,
      about: '',
      interest: [],
      skill: [],
      education: [],
      experience: null,
      projects: null,
      certificate: [],
    };

    return NextResponse.json({
      success: true,
      data,
      message: 'Files extracted successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Error uploading files' }, { status: 500 });
  }
});
