---
layout: post
title:  "git과 github"
date:   2020-07-01 14:36:00 +0900
categories: jekyll update
---

# git
- commit 내용은 트리로 구성되어있다.
- git add를 하면 stage에 checksum 형태로 올라간다. 이 체크섬이 같은 파일이라는것을 의미한다.

- git ls-files --stage
- git은 diff을 저장하는게 아니라 파일 자체를 통째로 저장하는 방식이다.

- git은 100개의 브랜치가 있는데 내용이 똑같으면 실제 파일은 1개만 존재한다. 폴더를 옮겨도 체크섬의 해시 값이같으면 (같은 변동없는 파일이면) 같은 파일로 인식한다.
- 음 

# commit
- tree가 있고
- massege가 있다.
- 커밋은 자신의 이전 커밋 즉, 부모 커밋이 있따.

# github
- social coding
- open source platform
- github 전에 나온것은? 