# 🚀 Hostinger 배포 가이드 (최종)

## ⚠️ 가장 중요한 것

**`public_html` 폴더의 모든 내용을 Hostinger의 `public_html` 폴더에 직접 업로드하세요.**

**절대 `greena_website` 같은 중첩 폴더를 만들지 마세요!**

## 📋 배포 방법

### 방법 1: File Manager 사용 (간단)

1. Hostinger 제어판 → **File Manager** 접속
2. `public_html` 폴더로 이동
3. 이 프로젝트의 `public_html` 폴더 안의 **모든 파일과 폴더**를 선택
4. Hostinger의 `public_html`에 **직접** 업로드
   - ❌ `public_html/greena_website/` (잘못된 방법)
   - ✅ `public_html/` (올바른 방법)

### 방법 2: FTP 클라이언트 사용 (권장)

1. FileZilla 같은 FTP 클라이언트 설치
2. Hostinger FTP 정보로 연결
3. 로컬: `greena-website/public_html/` 폴더
4. 서버: `public_html/` 폴더
5. 모든 파일 동기화

## ✅ 올바른 구조

업로드 후 Hostinger의 `public_html` 폴더 구조:

```
public_html/                    ← 웹 루트
├── .htaccess                  ← 필수
├── index.html                 ← 필수 (403 방지)
├── styles.css
├── script.js
├── maintenance.js
├── asset8.png
├── asset9.png
├── back.png
├── company/
│   ├── company.html
│   └── ...
├── products.html
└── maintenance.html
```

## ❌ 잘못된 구조 (403 에러 발생)

```
public_html/
└── greena_website/            ← 이렇게 하면 안 됨!
    ├── index.html
    └── ...
```

이렇게 하면:
- `greenaofficial.com/` → 403 에러 ❌
- `greenaofficial.com/greena_website/` → 작동 ✅ (하지만 URL이 이상함)

## 🔍 403 에러 해결

만약 403 에러가 발생한다면:

1. **`index.html` 위치 확인**
   - `public_html/index.html` (올바름) ✅
   - `public_html/greena_website/index.html` (잘못됨) ❌

2. **중첩 폴더 확인**
   - `greena_website` 같은 폴더가 있다면 삭제
   - 모든 파일을 `public_html` 루트로 이동

3. **`.htaccess` 파일 확인**
   - `public_html/.htaccess` 파일이 있는지 확인

4. **파일 권한 확인**
   - 폴더: 755
   - 파일: 644

## 📝 체크리스트

배포 전:
- [ ] `public_html` 폴더에 `index.html`이 있는가?
- [ ] `.htaccess` 파일이 있는가?
- [ ] 모든 이미지 파일이 포함되어 있는가?

배포 후:
- [ ] `https://greenaofficial.com/` 접속 테스트
- [ ] `https://greenaofficial.com/company/company.html` 접속 테스트
- [ ] 이미지가 모두 표시되는지 확인
- [ ] CSS/JS가 정상 작동하는지 확인

## 🌐 최종 URL

- 메인: `https://greenaofficial.com/`
- 회사소개: `https://greenaofficial.com/company/company.html`
- 제품소개: `https://greenaofficial.com/products.html`
- 유지관리: `https://greenaofficial.com/maintenance.html`

