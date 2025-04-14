import { App, TFile, getAllTags } from "obsidian";
import { type FileWithTags } from "./types";

export function filter(filesWithTags: FileWithTags[], tagsAND: string[], tagsOR: string[], tagsNOT: string[]) {
  let result = filesWithTags
  result = filterAND(result, tagsAND);
  result = filterOR(result, tagsOR);
  result = filterNOT(result, tagsNOT);
  return result;
}

function filterAND(filesWithTags: FileWithTags[], tagsAND: string[]) {
  if (tagsAND.length == 0) return filesWithTags;

  return filesWithTags.filter((fileWithTags: FileWithTags) => {
    for (let i = 0; i < tagsAND.length; i++) {
      let tag = tagsAND[i];
      if (fileWithTags.tags.indexOf(tag) == -1) return false;
    }

    return true;
  })
}

function filterOR(filesWithTags: FileWithTags[], tagsOR: string[]) {
  if (tagsOR.length == 0) return filesWithTags;

  return filesWithTags.filter((fileWithTags: FileWithTags) => {
    for (let i = 0; i < tagsOR.length; i++) {
      let tag = tagsOR[i];
      if (fileWithTags.tags.indexOf(tag) != -1) return true;
    }

    return false;
  })
}

function filterNOT(filesWithTags: FileWithTags[], tagsNOT: string[]) {
  if (tagsNOT.length == 0) return filesWithTags;

  return filesWithTags.filter((fileWithTags: FileWithTags) => {
    for (let i = 0; i < tagsNOT.length; i++) {
      let tag = tagsNOT[i];
      if (fileWithTags.tags.indexOf(tag) != -1) return false;
    }

    return true;
  })
}

export function getAllTagAndFiles(app: App) {
  return app.vault.getMarkdownFiles().map((markdownFile: TFile) => {
    let fileWithTags: FileWithTags = {
      file: markdownFile,
      tags: getTagsFromFile(app, markdownFile)
    }
    return fileWithTags;
  })
}

export function getTagsFromFile(app: App, file: TFile) {
  const cache = app.metadataCache.getFileCache(file);
  const fileTags = cache
    ? getAllTags(cache)?.map((tag) => tag.substring(1)) || []
    : [];
  return fileTags;
}
