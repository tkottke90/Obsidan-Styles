import {DataViewFile} from '../../types/dataview';

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

function getSiblingLink(fileList: Array<DataViewFile>, targetPos: number) {
  if (targetPos < 0 || targetPos >= fileList.length) return undefined;

  return fileList[targetPos];
}

function getWeekOfYear(frontmatter: Record<string, any>) {
  if (!frontmatter?.year) return undefined;

  const date = new Date(frontmatter.year, frontmatter.month - 1, frontmatter.date);
  const startOfYear = new Date(frontmatter.year, 0, 1);

  // Calculate the difference in Milliseconds
  const diff = date.valueOf() - startOfYear.valueOf();

  // Calculate the number of weeks
  return Math.floor(diff / ONE_WEEK);
}

function createDisplay(file: DataViewFile, scale = 1) {
  return `
<a href="${file.path}" class="internal-link">
  <section class="daily-note--navigator--item" style="transform: scale(${scale})">
    <h5>${file.name}</h5>
    <small>W${getWeekOfYear(file.frontmatter)}</small>
  </section>
</a>
  `;
}

function createEmptyPlaceholder() {
  return `<section class="daily-note--navigator--item"></section>`;
}

console.group("Daily Note Navigator")

const me = dv.current();
const dir = me.file.folder;

const siblingDailyPages = Array.from(dv.pages(`"${dir}"`))
  .filter(file => file.year && file.month && file.date)
  .sort((fileA, fileB) => {
    const a = new Date(fileA.year, fileA.month - 1, fileA.date);
    const b = new Date(fileB.year, fileB.month - 1, fileB.date);
    return a.valueOf() - b.valueOf();
  });

const meIndex = siblingDailyPages.findIndex(({ file }) => file.path === me.file.path);

const prev = getSiblingLink(siblingDailyPages, meIndex - 1);
const next = getSiblingLink(siblingDailyPages, meIndex + 1);

const result = `
<section class="daily-note--navigator">
${prev ? createDisplay(prev.file) : createEmptyPlaceholder()}
${createDisplay(me.file, 1.25)}
${next ? createDisplay(next.file) : createEmptyPlaceholder()}
</section>
`
console.groupEnd();

// @ts-ignore
return result;