import { Upload as UploadIcon } from 'lucide-react';
import { useState } from 'react';
import { TFile, Upload } from '~/components/fragments/input/upload';
import { Modal } from '~/components/fragments/modal';
import { Button } from '~/components/ui/button';

export const UploadCV = () => {
  const [files, setFiles] = useState<TFile[]>([]);

  const handleFileChange = (files: TFile[]) => {
    console.log(files);
  };

  return (
    <Modal
      textOpen="Uplad New CV"
      textCancel={<Button variant={'outline'}>Cancel</Button>}
      textAction={<Button>Upload CV</Button>}
      iconOpen={<UploadIcon />}
      title="Upload CV"
      content={<Upload multiple files={files} setFiles={setFiles} onChange={handleFileChange} mode="button" showFileList />}
    />
  );
};
