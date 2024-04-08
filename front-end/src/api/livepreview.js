import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { Stack } from "./contentstack";

ContentstackLivePreview.init({
  stackSdk: Stack, 
});

// Export the onEntryChange method for live preview updates
export const onEntryChange = ContentstackLivePreview.onEntryChange;
