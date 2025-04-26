import { useState, useRef, useCallback, useEffect } from "react";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";

interface ImageUploadProps {
  field: ControllerRenderProps<
    {
      serviceName: string;
      price: number;
      serviceImage?: string | File | undefined;
    },
    "serviceImage"
  >;
  fieldState: ControllerFieldState;
  setError: UseFormSetError<{
    serviceImage: File;
    serviceName: string;
    price: number;
  }>;
  clearErrors: UseFormClearErrors<{
    serviceImage: File;
    serviceName: string;
    price: number;
  }>;
  defaultImageUrl?: string;
}

const imageSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Chỉ cho phép upload file ảnh (jpg, png, webp)"
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, "File phải nhỏ hơn 5MB"),
});

const ImageUpload = ({
  field,
  fieldState,
  setError,
  clearErrors,
  defaultImageUrl,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImageUrl) {
      setPreview(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  // Xử lý file khi chọn hoặc kéo thả
  const handleFileChange = useCallback(
    async (selectedFile: File) => {
      try {
        imageSchema.parse({ file: selectedFile });
        field.onChange(selectedFile);
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
      } catch {
        setPreview(null);
        field.onChange(null);
      }
    },
    [field]
  );

  // Cấu hình react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
          handleFileChange(acceptedFiles[0]);
          clearErrors("serviceImage");
        } else {
          setError("serviceImage", {
            message: "Vui lòng chọn đúng định dạng file ảnh",
          });
        }
      },
      [handleFileChange, setError, clearErrors]
    ),
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreview(null);
    field.onChange(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}>
        <input {...getInputProps()} ref={fileInputRef} />

        {preview ? (
          <div className="">
            <div className="relative w-fit max-w-full mx-auto">
              <img
                src={preview}
                alt="Preview"
                className="w-full border h-48 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute hover:bg-transparent font-bold text-lg hover:text-red-900 top-0 right-0"
                onClick={handleClear}>
                X
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="w-12 h-12 text-gray-400" />
            {isDragActive ? (
              <p className="text-primary">Thả file ảnh vào đây...</p>
            ) : (
              <p className="text-gray-500">
                Kéo thả file ảnh vào đây, hoặc{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={handleButtonClick}>
                  chọn file
                </span>
              </p>
            )}
            <p className="text-sm text-gray-400">Hỗ trợ: .jpg, .png, .webp</p>
            <p className="text-sm text-gray-400">( Dung lượng tối đa: 5MB )</p>
          </div>
        )}
      </div>
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};

export default ImageUpload;
