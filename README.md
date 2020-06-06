# Github Bookmarks Chrome Extension

A chrome extension for managing your favourite snippets or files of codes. Keep notes / learn more / take a load of remembering.

[View extension in chrome store](https://chrome.google.com/webstore/detail/github-bookmarks/ebokekkpmchijniaphcbknendmdafglf)

<img src="/images/screenshots/bookmark-list.png" width="600px" />

## Build production version

As Google Chrome extensions do not require a lot of the boilerplate files and build tools that working on a javascript project does - Docker is introduced to only include the necessary files and keep the extension small. The following commands are used to create this production version of the extension:

*(before these commands are run please make sure you have your docker client running)*

```
image_id=$(docker build . -q)
container_id=$(docker create $image_id)
docker cp $container_id:/extension.zip ./github-bookmark-extension.zip
docker rm $container_id
```

*(you can clean up the image with `docker rmi $image_id` unless you want to keep it for debugging)*
