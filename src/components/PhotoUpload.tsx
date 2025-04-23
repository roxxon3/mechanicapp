
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface PhotoUploadProps {
  onPhotoUploaded?: (photoUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUploaded }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addVehiclePhoto } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    
    reader.onload = () => {
      const photoUrl = reader.result as string;
      setPhoto(photoUrl);
      addVehiclePhoto(photoUrl);
      if (onPhotoUploaded) onPhotoUploaded(photoUrl);
      setUploading(false);
      toast.success("Photo uploaded successfully", {
        description: "Your mechanic can now see the problem."
      });
    };
    
    reader.onerror = () => {
      toast.error("Failed to upload photo");
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="w-full">
      {!photo ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center py-4">
            <Camera size={48} className="text-gray-400 mb-3" />
            <h3 className="text-lg font-medium mb-2">Upload Problem Photo</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Take a photo of your vehicle issue to help mechanics understand the problem better
            </p>
            
            <div className="flex space-x-4">
              <Button 
                onClick={triggerFileInput} 
                variant="outline"
                className="flex items-center"
                disabled={uploading}
              >
                <Upload size={16} className="mr-2" />
                Choose File
              </Button>
              <Button 
                onClick={triggerFileInput}
                disabled={uploading}
              >
                <Camera size={16} className="mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={photo} 
            alt="Vehicle problem" 
            className="w-full h-64 object-cover"
          />
          <Button 
            onClick={removePhoto}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
          >
            <X size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
