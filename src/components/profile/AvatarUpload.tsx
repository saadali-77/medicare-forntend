import { useRef, useState, type ChangeEvent } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const MAX_SIZE_BYTES = 2 * 1024 * 1024;

const AVATAR_SIZE = 256;

const resizeToSquare = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      const side = Math.min(image.width, image.height);
      const canvas = document.createElement("canvas");
      canvas.width = AVATAR_SIZE;
      canvas.height = AVATAR_SIZE;
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Canvas is not supported"));
        return;
      }

      context.drawImage(
        image,
        (image.width - side) / 2,
        (image.height - side) / 2,
        side,
        side,
        0,
        0,
        AVATAR_SIZE,
        AVATAR_SIZE,
      );
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };

    image.src = url;
  });

const AvatarUpload = () => {
  const { user, setAvatar } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  if (!user) return null;

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError("Image must be 2MB or smaller.");
      return;
    }

    try {
      setAvatar(await resizeToSquare(file));
      setError("");
    } catch {
      setError("Could not process this image. Try another one.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-600 text-3xl font-semibold text-white">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white transition hover:bg-slate-700"
          aria-label="Change profile image"
        >
          <Camera size={14} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {user.avatar && (
        <button
          type="button"
          onClick={() => setAvatar(undefined)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-red-600"
        >
          <Trash2 size={12} />
          Remove image
        </button>
      )}

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default AvatarUpload;
