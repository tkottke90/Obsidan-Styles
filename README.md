# Obsidian Styles

![GitHub package.json version](https://img.shields.io/github/package-json/v/tkottke90/Obsidan-Styles)

This is a collection of CSS style sheets and JS Snippets that I use with my Obsidian notebook.  

## Documentation

Usage documentation can be found in the [Wiki Page](https://github.com/tkottke90/Obsidan-Styles/wiki) for this repository.  To learn about how to install this yourself or how to use any of the provided tools, you can find that all there.

## Issues & Discussions

This repo is something I plan on continuing to improve over time.  If you find any issues, feel free to open an [Issue](https://github.com/tkottke90/Obsidan-Styles/issues) and I will take a look as time permits.  Some issues may be moved to discussions as well if it is an enhancement or new feature.

> Important
>
> One important ask I have before opening an issue is that I will not specifically add features for plugins I do not use.  This repository is first and foremost for me to maintain resources across vaults.


## Developer Setup & Contribution

Pull requests, bug reports, and all other forms of contribution are welcomed and highly encouraged! :octocat:

To develop against this repository you will need NodeJS and NPM.  I wanted to use SCSS to create styles but that was not natively supported by Obsidian. This module uses [Dart-Sass](https://github.com/sass/dart-sass?tab=readme-ov-file) to automatically compile the SCSS files into CSS.

Once you clone the repository to your local machine, install the packages:

```sh
npm install
```

Next, create 2 text files in the root directory which target your Obsidian Notebook (specifically the root and scripts folders).  The contents of those files should be the path to your Obsidian Vault and the Templater Scripts directory in your Vault.  I recommend creating a testing vault for developing against to avoid breaking your current vault. 

```sh
echo '<path to Obsidian Vault>' > .obsidian.local
echo '<path to Templater Scripts>' > .scripts.local
```

Finally, a watcher npm script has been setup which will automatically compile and deploy the changes automatically for you.

```sh
npm run watch
```
