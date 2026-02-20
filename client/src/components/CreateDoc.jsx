import * as Dialog from "@radix-ui/react-dialog";

export const CreateDoc = ({ open, setOpen }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 " />

        {/* Content */}
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            bg-white p-6 rounded-lg shadow-xl
            w-100 max-w-[90vw]
            z-50
          "
        >
          <Dialog.Title className="text-lg font-bold">
            Create New Board
          </Dialog.Title>

          <button
            onClick={() => setOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded"
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
