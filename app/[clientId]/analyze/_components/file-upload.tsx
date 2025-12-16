'use client';

import { FileText, Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | undefined) => void;
  file: File | undefined;
  onPreviewUrlChange: (url: string | undefined) => void;
}

export function FileUpload({ onFileSelect, file, onPreviewUrlChange }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type === 'application/pdf') {
        onFileSelect(droppedFile);
        onPreviewUrlChange(URL.createObjectURL(droppedFile));
      }
    },
    [onFileSelect, onPreviewUrlChange],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile && selectedFile.type === 'application/pdf') {
        onFileSelect(selectedFile);
        onPreviewUrlChange(URL.createObjectURL(selectedFile));
      }
    },
    [onFileSelect, onPreviewUrlChange],
  );

  const handleRemove = useCallback(() => {
    onFileSelect(undefined);
    onPreviewUrlChange(undefined);
  }, [onFileSelect, onPreviewUrlChange]);

  if (file) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border h-full">
        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="shrink-0 text-muted-foreground hover:text-destructive"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300',
        isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50 hover:bg-muted/50',
      )}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className={cn('p-3 rounded-full mb-2 transition-colors', isDragging ? 'bg-primary/10' : 'bg-muted')}>
          <Upload className={cn('w-5 h-5 transition-colors', isDragging ? 'text-primary' : 'text-muted-foreground')} />
        </div>
        <p className="text-sm text-foreground font-medium text-center">
          <span className="text-primary">Klik upload</span> atau drag & drop
        </p>
        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
      </div>
      <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
    </label>
  );
}
