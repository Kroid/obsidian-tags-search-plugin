<script lang="ts">
  import { App, TFile } from "obsidian";
  import { filter, getAllTagAndFiles } from "./utils";
  import { type FileWithTags } from "./types";

  let timer: string | number | NodeJS.Timeout;
  function debouncedSearch() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchResults = filter(filesWithTags, parseTagsFromInput(tagsAND), parseTagsFromInput(tagsOR), parseTagsFromInput(tagsNOT))
    }, 1000);
  }

  function parseTagsFromInput(str: string) {
    return str.split(',').map((tag) => tag.trim()).filter((tag) => tag.length)
  }

  function openFile(file: TFile) {
    let leaf = app.workspace.getLeaf()
    leaf.openFile(file)
  }

  interface Props {
    app: App;
  }

  let { app }: Props = $props();

  let filesWithTags: FileWithTags[] = getAllTagAndFiles(app)

  let tagsAND = $state('')
  let tagsOR = $state('')
  let tagsNOT = $state('')
  let searchResults: FileWithTags[] = $state([])
</script>

<div>
  <h2>Search</h2>

  <div class="form-group">
    <label for="tags_and">Tags AND</label>
    <input type="search" id="tags_and" placeholder="tags AND" bind:value={
      () => tagsAND,
      (v) => {
        tagsAND = v;
        debouncedSearch()
      }
    }>
  </div>

  <div class="form-group">
    <label for="tags_or">Tags OR</label>
    <input type="search" id="tags_or" placeholder="tags OR" bind:value={
      () => tagsOR,
      (v) => {
        tagsOR = v;
        debouncedSearch()
      }
    }>
  </div>

  <div class="form-group">
    <label for="tags_not">Tags NOT</label>
    <input type="search" id="tags_not" placeholder="tags NOT" bind:value={
      () => tagsNOT,
      (v) => {
        tagsNOT = v;
        debouncedSearch()
      }
    }>
  </div>

  <h2>Search results</h2>

  {#each searchResults as searchResult}
    <div class="tree-item nav-file">
      <div class="tree-item-self nav-file-title tappable is-clickable" onclick={() => openFile(searchResult.file)}>
        <div class="tree-item-inner nav-file-title-content">{searchResult.file.basename}</div>
      </div>
    </div>
  {/each}

</div>

<style scoped>
  .form-group {
    margin: 20px 0;
  }
  .form-group label {
    color: rgb(153, 153, 153);
    display: block;
    margin-bottom: 8px;
  }
  .form-group input[type=search] {
    display: block;
    width: 100%;
  }

  .nav-file-title {
    padding-left: 0;
  }
</style>
