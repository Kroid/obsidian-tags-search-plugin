import { Plugin } from 'obsidian';

export default class TagsPlugin extends Plugin {
  async onload() {
    console.log('loading tags plugin')
  }
  async onunload() {
    console.log('unloading tags plugin')
  }
}
