"use client";

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image", className = "" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-muted-foreground mb-2">{label}</label>}

            <div
                className={`relative group cursor-pointer transition-all duration-200 border-2 border-dashed rounded-xl overflow-hidden
          ${dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/50'}
          ${value ? 'h-64' : 'h-32'}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : value ? (
                    <div className="relative w-full h-full">
                        <img
                            src={value}
                            alt="Uploaded"
                            className="w-full h-full object-contain bg-black/20"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium flex items-center gap-2">
                                <Upload className="w-4 h-4" /> Change Image
                            </p>
                        </div>
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform z-20"
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                        <div className="p-3 rounded-full bg-muted mb-2 group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">Click or drag image to upload</p>
                        <p className="text-xs opacity-70 mt-1">SVG, PNG, JPG or GIF</p>
                    </div>
                )}
            </div>
        </div>
    );
}
