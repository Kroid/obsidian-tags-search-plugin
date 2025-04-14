
import { ItemView, WorkspaceLeaf } from 'obsidian';
import {mount, unmount} from 'svelte';
import ViewContent from './ViewContent.svelte';

export const VIEW_TYPE_TAGS = 'tags-search-panel';

export class TagsView extends ItemView {
  icon = 'binoculars';
  content: ReturnType<typeof ViewContent> | undefined;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_TAGS;
  }

  getDisplayText() {
    return 'Tags search panel';
  }

  async onOpen() {
    this.content = mount(ViewContent, {
      target: this.contentEl,
      props: {
        app: this.app,
      }
    });
  }

  async onClose() {
    // Nothing to clean up.
  }
}
