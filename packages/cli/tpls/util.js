import { fs, glob, echo, path, chalk, $ } from "zx";
import { fileURLToPath } from "url";
import Mustache from "mustache";
import fsExtra from "fs-extra";

const { copyFileSync, readFileSync, statSync, writeFileSync, existsSync } = fs;
const { dirname, join, relative } = path;

function copyTpl(opts) {
  const tpl = readFileSync(opts.templatePath, "utf-8");
  const content = Mustache.render(tpl, opts.context);
  fsExtra.mkdirpSync(dirname(opts.target));

  echo`${chalk.green("写入:")} ${opts.target}`;

  writeFileSync(opts.target, content, "utf-8");
}

async function copyDirectory(opts) {
  if (!fs.existsSync(opts.path)) {
    echo`${chalk.red("模板不存在")}`;
    process.exit(1);
  }

  const files = await glob("**/*", {
    cwd: opts.path,
    dot: true,
    ignore: ["**/node_modules/**"],
  });

  files.forEach((file) => {
    const absFile = join(opts.path, file);

    if (statSync(absFile).isDirectory()) return;
    if (file.endsWith(".tpl")) {
      copyTpl({
        templatePath: absFile,
        target: join(opts.target, file.replace(/\.tpl$/, "")),
        context: opts.context,
      });
    } else {
      echo`${chalk.green("复制: ")} ${file}`;

      const absTarget = join(opts.target, file);
      fsExtra.mkdirpSync(dirname(absTarget));
      copyFileSync(absFile, absTarget);
    }
  });
}

async function getGitInfo() {
  try {
    const username = await $`git config --global user.name`;
    const email = await $`git config --global user.email`;
    return { username, email };
  } catch (e) {
    return {
      username: "",
      email: "",
    };
  }
}

async function initGit(installPath) {
  const isGit = existsSync(join(installPath, ".git"));

  if (isGit) return;

  try {
    await $`cd ${installPath} && git init`;
  } catch (err) {
    echo`${err}`;
    echo`${chalk.red("初始化 git 失败")}`;
  }
}

function getDirname() {
  return dirname(fileURLToPath(import.meta.url));
}

export { copyTpl, copyDirectory, getGitInfo, initGit, getDirname };
