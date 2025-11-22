# 🚀 Hostinger 배포 가이드

## ⚠️ 중요: 403 에러 방지

**절대 `greena_website` 같은 중첩 폴더를 만들지 마세요!**

Hostinger의 `public_html` 폴더가 웹 루트입니다. 이 폴더 안에 **직접** 파일들을 업로드해야 합니다.

## 📋 배포 단계

### 1. Hostinger File Manager 접속
- Hostinger 제어판 → File Manager
- `public_html` 폴더로 이동

### 2. 파일 업로드 방법

**방법 A: 전체 폴더 내용 업로드 (권장)**
1. 이 폴더(`public_html`)의 **모든 파일과 폴더**를 선택
2. Hostinger의 `public_html` 폴더에 **직접** 업로드
3. **중첩 폴더를 만들지 마세요!**

**방법 B: FTP 클라이언트 사용**
1. FileZilla 같은 FTP 클라이언트 연결
2. 로컬: `public_html` 폴더
3. 서버: `public_html` 폴더
4. 모든 파일 동기화

### 3. 올바른 구조 ✅
```
Hostinger public_html/          ← 웹 루트
├── index.html                  ← 여기 있어야 함! (403 방지)
├── .htaccess                   ← 필수
├── styles.css
├── script.js
├── company/
│   └── company.html
├── products.html
└── maintenance.html
```

### 4. 잘못된 구조 ❌
```
Hostinger public_html/
└── greena_website/             ← 이렇게 하면 안 됨!
    ├── index.html
    └── ...
```
이렇게 하면 `greenaofficial.com/greena_website/`로 접근해야 하고, 루트(`greenaofficial.com/`)에서는 403 에러가 발생합니다.

## ✅ 배포 체크리스트

- [ ] `index.html`이 `public_html` 루트에 있는가?
- [ ] `.htaccess` 파일이 업로드되었는가?
- [ ] 중첩 폴더(`greena_website` 등)를 만들지 않았는가?
- [ ] 모든 이미지 파일이 올바른 경로에 있는가?
- [ ] 파일 권한 확인 (폴더: 755, 파일: 644)

## 🔍 403 에러 해결 방법

### 문제 1: `index.html`이 루트에 없음
**증상**: `greenaofficial.com/` 접속 시 403 에러
**해결**: `public_html` 폴더 루트에 `index.html`이 있는지 확인

### 문제 2: 폴더 안에 파일을 넣음
**증상**: `greenaofficial.com/` 접속 시 403 에러, `greenaofficial.com/greena_website/`는 작동
**해결**: `greena_website` 같은 폴더를 삭제하고, `public_html` 안에 직접 파일 업로드

### 문제 3: `.htaccess` 파일 누락
**증상**: 403 에러 또는 디렉토리 리스팅
**해결**: `.htaccess` 파일이 `public_html` 루트에 있는지 확인

### 문제 4: 파일 권한 문제
**증상**: 403 에러
**해결**: File Manager에서 파일 권한 확인
- 폴더: 755
- 파일: 644

## 📁 최종 파일 구조

```
public_html/                    ← Hostinger 웹 루트 (여기에 직접 업로드)
├── .htaccess                  ← 필수
├── index.html                 ← 필수 (루트에 있어야 함)
├── styles.css
├── script.js
├── maintenance.js
├── asset8.png
├── asset9.png
├── back.png
├── float - close.png
├── float - open.png
├── person-special-equipment-disinfecting-restricted-area.jpg
├── young-engineers-coming-with-energy-innovations.jpg
├── company/
│   ├── company.html
│   ├── asset8.png
│   └── asset9.png
├── products.html
├── maintenance.html
└── map/
    └── map.html
```

## 🌐 URL 구조

배포 후 접근 URL:
- 메인: `https://greenaofficial.com/`
- 회사소개: `https://greenaofficial.com/company/company.html`
- 제품소개: `https://greenaofficial.com/products.html`
- 유지관리: `https://greenaofficial.com/maintenance.html`

## 💡 추가 팁

1. **FTP 클라이언트 사용**: FileZilla 같은 FTP 클라이언트를 사용하면 더 쉽게 업로드할 수 있습니다.
2. **전체 폴더 압축 업로드**: `public_html` 폴더 전체를 압축해서 업로드한 후 서버에서 압축 해제하는 방법도 있습니다.
3. **백업**: 업로드 전에 기존 파일을 백업하세요.
4. **이미지 경로**: 파일 이름에 공백이 있으면 URL 인코딩 확인 (`float%20-%20open.png`)

