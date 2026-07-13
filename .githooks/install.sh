#!/bin/bash
# hsol-site pre-push 훅 설치 — 배포 전 사이트 일관성 검증(16종)
cp "$(dirname "$0")/pre-push" "$(git rev-parse --git-dir)/hooks/pre-push"
chmod +x "$(git rev-parse --git-dir)/hooks/pre-push"
echo "✅ pre-push 훅 설치됨 — push 전 verify_site(16종) 자동 검증"
