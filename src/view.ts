
import { ItemView, WorkspaceLeaf } from 'obsidian';
import {mount, unmount} from 'svelte';
import ViewContent from './ViewContent.svelte';
import type TagsPlugin from './plugin';

export const VIEW_TYPE_TAGS = 'tags-search-panel';

export class TagsView extends ItemView {
  icon = 'binoculars';
  content: ReturnType<typeof ViewContent> | undefined;
  plugin: TagsPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: TagsPlugin) {
    super(leaf);
    this.plugin = plugin
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
        plugin: this.plugin,
      }
    });
  }

  async onClose() {
    // Nothing to clean up.
  }
}
