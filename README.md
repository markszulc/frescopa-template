# Frescopa Experience Template

This is a site template for Adobe Experience Manager as a Cloud Service (AEMaaCS).
While this is still a supportred way to build a site, it is recommended to review Edge Delivery Services as a recommeded alternative. 

<img src="previews/frescopa-template.png?raw=true" alt="Standard site preview" width="50%">

It can serve as a standard starting point for creating a new site, or as a starting point for creating custom site templates.

## Structure

* `files`: Folder with the UI kit XD file and possibly other files.
* `previews`: Folder with screenshots of the site template.
* `site`: Content package of the content that will be copied for each site created from this template (templates, pages, etc.).
* `theme`: Sources of the template theme to modify how the site looks (CSS, JS, etc.).

## Install on AEMaaCS

* Go to <https://github.com/adobe/frescopa-template/releases/latest> and download `frescopa-template-{version}.zip`
* Upload `frescopa-template-{version}.zip` in AEMaaCS's site creation wizard to create a new site from that template.

## Build locally

Alternatively you can build `frescopa-template-{version}.zip` locally.

1. Install Maven (to be able to use the packaging script).
1. Initialize the project with following command executed at the template root:

   ```bash
   npm install
   ```

1. To build the site template, run following command executed at the template root:

   ```bash
   npm run build
   ```

1. The site template ZIP file is now located below the template root: `frescopa-template-{version}.zip`.
1. Upload to an AEMaaCS site creation wizard. For installing on a local cloudready development instance use `npm run deploy`.

## Develop Site Template

See: <https://github.com/adobe/aem-site-template-builder>

## Release

Run `Build and release` GitHub workflow and provide the semantic version you're about to release. The workflow executes the following steps:

* Build Site Template
* Release latest version on github
* Commit, build and release latest Site Theme related changes in [Site Theme E2E Repo](https://github.com/adobe/frescopa-template-theme-e2e).

## Contributing

Contributions are welcomed! Read the [Contributing Guide](.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the MIT License. See [LICENSE](LICENSE.md) for more information.
