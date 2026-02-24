import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_8xHrFqXF4lqCWxHQnjjjAfbyceJVYaREQ2NqR40AtD-_gdF-FfETQ8VmRiyGx5PS",
});

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} = createRoomContext(client);