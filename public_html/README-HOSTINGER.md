# Hostinger 배포 가이드

## 📁 public_html 폴더 구조

이 폴더의 모든 내용을 Hostinger의 `public_html` 폴더에 업로드하세요.

## 업로드 방법

1. Hostinger File Manager 또는 FTP 클라이언트 사용
2. `public_html` 폴더의 모든 파일과 폴더를 서버의 `public_html` 디렉토리에 업로드
3. 파일 권한 확인:
   - 폴더: 755
   - 파일: 644
   - index.html이 루트에 있는지 확인

## 사이트 구조

- **루트 (greenaofficial.com)**: `index.html` - 메인 페이지
- **회사소개**: `company/company.html` - greenaofficial.com/company/company.html
- **지도**: `map/map.html` - greenaofficial.com/map/map.html

## 중요 사항

✅ **루트에 `index.html`이 있어야 합니다** (403 에러 방지)
✅ 모든 이미지와 CSS, JS 파일이 올바른 경로에 있는지 확인
✅ `.htaccess` 파일이 업로드되었는지 확인

## 문제 해결

### 403 에러가 계속 발생하는 경우:
1. `index.html`이 루트(`public_html`)에 있는지 확인
2. 파일 권한 확인 (644)
3. `.htaccess` 파일이 있는지 확인
4. Hostinger File Manager에서 파일이 제대로 업로드되었는지 확인

### 이미지가 안 보이는 경우:
- 이미지 파일이 올바른 경로에 있는지 확인
- 파일 이름에 공백이 있으면 URL 인코딩 확인 (`float%20-%20open.png`)

