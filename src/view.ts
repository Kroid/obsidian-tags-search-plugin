
import { ItemView, WorkspaceLeaf } from 'obsidian';
import {mount, unmount} from 'svelte';
import ViewContent from './ViewContent.svelte';

export const VIEW_TYPE_TAGS = 'tags-view';

export class TagsView extends ItemView {
  icon = 'pentagon';
  content: ReturnType<typeof ViewContent> | undefined;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
    // console.log(this.app.vault.getMarkdownFiles());
    
  }

  getViewType() {
    return VIEW_TYPE_TAGS;
  }

  getDisplayText() {
    return 'Tags view';
  }

  async onOpen() {
    // const container = this.containerEl.children[1];
    // container.empty();
    // container.createEl('h4', { text: 'Tags view' });
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
