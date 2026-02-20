import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export const CreateDoc = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Board name is required");
      return;
    }

    console.log("Board Name:", name);
    console.log("Image File:", image);

    // Reset
    setName("");
    setImage(null);
    setPreview(null);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Dialog.Content
          className="
            fixed top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            bg-white p-6 rounded-lg shadow-xl
            w-105 max-w-[90vw]
            z-50
            space-y-4
          "
        >
          <Dialog.Title className="text-lg font-bold">
            Create New Board
          </Dialog.Title>

          {/* Board Name */}
          <input
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Upload cover image
            </label>

            {/* Hidden input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="cover-upload"
            />

            {/* Custom upload box */}
            <label
              htmlFor="cover-upload"
              className="
                  w-full h-40
                  border-2 border-dashed border-gray-300
                  rounded-lg
                  flex items-center justify-center
                  cursor-pointer
                  hover:bg-gray-50 transition
                  overflow-hidden
                "
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
