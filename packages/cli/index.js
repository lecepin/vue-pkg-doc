#!/usr/bin/env node

import { echo, fetch, fs, chalk, $, question, path } from "zx";
import semver from "semver";
import inquirer from "inquirer";
import Say from "cfonts";
import tpls from "./tpls/tpls.js";
import { copyDirectory, getGitInfo, initGit, getDirname } from "./tpls/util.js";

async function greeting(currentPackageJson) {
  Say.say("vue-pkg", {
    // font: "text",
    colors: ["#ff2e4d", "cyan"],
  });
  echo`${chalk.hex("#0f0")("版本: " + currentPackageJson.version)}`;
  echo``;
}
async function checkForUpdates(currentPackageJson) {
  const currentVersion = currentPackageJson.version;
  const response = await fetch("https://xx.npmjs.com/xx");
  const latestVersionInfo = await response.json();
  const latestVersion = latestVersionInfo["dist-tags"].latest;

  if (semver.lt(currentVersion, latestVersion)) {
    echo`${chalk.yellow("发现新版本")}: ${currentVersion} -> ${chalk.yellow(
      latestVersion
    )}`;
    echo`执行: ${chalk.green(
      `npm install -g ${currentPackageJson.name}@latest`
    )} 进行更新`;

    process.exit(1);
  }
}

async function selectTpl(tpls) {
  const { tpl } = await inquirer.prompt([
    {
      type: "list",
      name: "tpl",
      message: "选择模板:",
      choices: tpls.map((tpl) => tpl.title),
    },
  ]);
  const { name } = tpls.find((item) => item.title === tpl);

  return name;
}

async function selectInstallPath() {
  const dirPath = (await question("请输入安装路径: (默认当前目录 ./)")) || "./";
  return path.resolve(dirPath);
}

async function installTpl(tplName, installPath) {
  const { username, email } = await getGitInfo();

  await copyDirectory({
    path: path.join(getDirname(), tplName),
    target: installPath,
    context: {
      author:
        email && username
          ? `${username} <${email}>`.replace(/\s+/g, "").trim()
          : "",
    },
  });

  await initGit(installPath);
  echo`
${chalk.green.bold("安装成功")}

请执行:
${chalk.green(`cd ${installPath}`)}
${chalk.green("npm install")}
`;
}

async function main() {
  $.verbose = false;
  const currentPackageJson = JSON.parse(
    await fs.readFile(path.resolve(getDirname(), "../package.json"), "utf8")
  );

  await greeting(currentPackageJson);
  try {
    await checkForUpdates(currentPackageJson);
  } catch (error) {}
  const tplName = await selectTpl(tpls);
  const installPath = await selectInstallPath();
  await installTpl(tplName, installPath);
}

main().catch((err) => {
  console.error(err);
});
