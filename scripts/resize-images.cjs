const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const root = process.cwd();

const jobs = [
  {
    label: '57 位參賽者縮圖',
    inputDir: 'public/imags/57位參賽者',
    outputDir: 'public/imags/57位參賽者/thumb',
    width: 700,
    quality: 75,
  },
  {
    label: '入圍者縮圖',
    inputDir: 'public/imags/入圍者',
    outputDir: 'public/imags/入圍者/thumb',
    width: 900,
    quality: 78,
  },
  {
    label: '活動紀錄縮圖',
    inputDir: 'public/imags/活動紀錄',
    outputDir: 'public/imags/活動紀錄/thumb',
    width: 1100,
    quality: 78,
  },
  {
    label: '優惠 EDM 預覽縮圖',
    inputDir: 'public/imags',
    outputDir: 'public/imags/offers/thumb',
    width: 900,
    quality: 78,
    onlyFiles: ['票券優惠EDM.webp', '新經理獎勵EDM.webp'],
  },
  {
  label: '重點封面縮圖',
  inputDir: 'public/imags',
  outputDir: 'public/imags/thumb',
  width: 1600,
  quality: 82,
  onlyFiles: ['主視覺.webp', '花絮封面.webp'],
},
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function getWebpFiles(inputDir, onlyFiles) {
  if (onlyFiles?.length) return onlyFiles;

  const files = await fs.readdir(inputDir);
  return files.filter((file) => file.toLowerCase().endsWith('.webp'));
}

async function resizeImage({ inputFile, outputFile, width, quality }) {
  await sharp(inputFile)
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
    })
    .toFile(outputFile);
}

async function resizeJob(job) {
  const inputDir = path.join(root, job.inputDir);
  const outputDir = path.join(root, job.outputDir);

  if (!(await exists(inputDir))) {
    console.warn(`略過：找不到資料夾 ${job.inputDir}`);
    return;
  }

  await ensureDir(outputDir);

  const files = await getWebpFiles(inputDir, job.onlyFiles);

  console.log(`\n開始處理：${job.label}`);
  console.log(`輸入：${job.inputDir}`);
  console.log(`輸出：${job.outputDir}`);

  for (const file of files) {
    const inputFile = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file);

    if (!(await exists(inputFile))) {
      console.warn(`略過：找不到檔案 ${path.relative(root, inputFile)}`);
      continue;
    }

    await resizeImage({
      inputFile,
      outputFile,
      width: job.width,
      quality: job.quality,
    });

    console.log(`完成：${path.relative(root, outputFile)}`);
  }
}

async function main() {
  for (const job of jobs) {
    await resizeJob(job);
  }

  console.log('\n圖片縮圖產生完成。');
}

main().catch((error) => {
  console.error('\n圖片縮圖失敗：');
  console.error(error);
  process.exit(1);
});