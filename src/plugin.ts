import { Plugin, WorkspaceLeaf  } from 'obsidian';
import { TagsView, VIEW_TYPE_TAGS } from './view';

export default class TagsPlugin extends Plugin {
  async onload() {
    console.log('loading tags plugin!')

    this.registerView(
      VIEW_TYPE_TAGS, 
      (leaf) => new TagsView(leaf)
    );

    this.activateTagsView();

    this.addCommand({
      id: 'show-tags-search-panel',
      name: 'Show tags view panel',
      callback: () => {
        this.activateTagsView();
      }
    })
  }

  async onunload() {
    this.deactivateTagsView();
  }


  async activateTagsView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_TAGS);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getLeftLeaf(false)!;
      await leaf.setViewState({ type: VIEW_TYPE_TAGS, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }

  deactivateTagsView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_TAGS);
  }
}
