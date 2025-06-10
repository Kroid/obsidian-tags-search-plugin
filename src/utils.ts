import { App, TFile, getAllTags } from "obsidian";
import { type FilesTagsMap } from "./types";

export function filter(filesTagsMap: FilesTagsMap, tagsAND: string[], tagsOR: string[], tagsNOT: string[]) {
  let result = new Map(filesTagsMap)
  result = filterAND(result, tagsAND);
  result = filterOR(result, tagsOR);
  result = filterNOT(result, tagsNOT);
  return result;
}

function filterAND(filesTagsMap: FilesTagsMap, tagsAND: string[]) {
  if (tagsAND.length == 0) return filesTagsMap;

  let result: FilesTagsMap = new Map()
  filesTagsMap.forEach((tags: string[], file: TFile) => {
    for (let i = 0; i < tagsAND.length; i++) {
      let tag = tagsAND[i];
      if (tags.indexOf(tag) == -1) return;
    }

    result.set(file, tags)
  })

  return result;
}

function filterOR(filesTagsMap: FilesTagsMap, tagsOR: string[]) {
  if (tagsOR.length == 0) return filesTagsMap;

  let result: FilesTagsMap = new Map()
  filesTagsMap.forEach((tags: string[], file: TFile) => {
    for (let i = 0; i < tagsOR.length; i++) {
      let tag = tagsOR[i];
      if (tags.indexOf(tag) != -1) return result.set(file, tags);
    }
  })

  return result;
}

function filterNOT(filesTagsMap: FilesTagsMap, tagsNOT: string[]) {
  if (tagsNOT.length == 0) return filesTagsMap;

  let result: FilesTagsMap = new Map()
  filesTagsMap.forEach((tags: string[], file: TFile) => {
    for (let i = 0; i < tagsNOT.length; i++) {
      let tag = tagsNOT[i];
      if (tags.indexOf(tag) != -1) return;
    }

    result.set(file, tags)
  })

  return result;
}

export function getAllTagAndFiles(app: App) {
  let result: FilesTagsMap = new Map()
  app.vault.getMarkdownFiles().forEach((markdownFile: TFile) => {
    result.set(markdownFile, getTagsFromFile(app, markdownFile))
  })
  return result;
}

export function getTagsFromFile(app: App, file: TFile) {
  let result: string[] = []
  const cache = app.metadataCache.getFileCache(file);
  const fileTags = cache
    ? getAllTags(cache)?.map((tag) => tag.substring(1)) || []
    : [];

  fileTags.forEach((tag) => {
    result.push(tag)
    parseTagForParents(tag).forEach((tag) => result && result.push(tag))
  })

  return result;
}

// "it/lang/ruby" => ["it/lang", "it"]
function parseTagForParents(tag: string, result?: string[]): string[] {
  if (!result) result = []

  let arr = tag.split('/')
  arr.pop()
  if (!arr.length) return result;

  let newTag = arr.join('/')
  result.push(newTag)
  return parseTagForParents(newTag, result)
}
