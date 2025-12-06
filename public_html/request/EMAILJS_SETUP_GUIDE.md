# EmailJS 설정 가이드

## 1. EmailJS 계정 설정

1. https://www.emailjs.com 에서 계정 생성 및 로그인
2. Dashboard로 이동

## 2. Email Service 추가

1. **Email Services** 메뉴 클릭
2. **Add New Service** 클릭
3. 원하는 이메일 서비스 선택 (Gmail, Outlook 등)
4. Service ID 복사 (예: `service_xxxxxxx`)

## 3. Email Template 생성

1. **Email Templates** 메뉴 클릭
2. **Create New Template** 클릭
3. Template ID: `w3t8yfm` (이미 생성되어 있음)
4. Template Content에 다음 변수들을 사용:

### 사용 가능한 변수 목록:

```
{{to_email}} - 수신 이메일 (greena911@naver.com)
{{from_email}} - 발신 이메일 (사용자 입력)
{{from_name}} - 발신자 이름
{{company_name}} - 회사명
{{phone}} - 연락처
{{inquiry_type}} - 문의 유형 (유지관리 문의 / 렌탈 문의)
{{device_type}} - 기기 종류 (공기청정기, 공기순환기 등)
{{region}} - 지역 (렌탈 문의만)
{{room_size}} - 공기청정기 평수 (렌탈 문의만)
{{device_count}} - 기기 대수 (렌탈 문의만)
{{content}} - 별도 문의사항
{{subject}} - 이메일 제목
```

### 템플릿 예시:

```
제목: {{subject}}

문의 유형: {{inquiry_type}}

담당자 정보:
- 회사명: {{company_name}}
- 이름: {{from_name}}
- 연락처: {{phone}}
- 이메일: {{from_email}}

기기 종류: {{device_type}}

{% if inquiry_type == "렌탈 문의" %}
렌탈 정보:
- 지역: {{region}}
- 공기청정기 평수: {{room_size}}
- 기기 대수: {{device_count}}
{% endif %}

별도 문의사항:
{{content}}
```

## 4. Public Key 복사

1. **Account** > **General** 메뉴로 이동
2. **Public Key** 복사 (예: `user_xxxxxxx`)

## 5. request.html 파일 수정

`request/request.html` 파일에서 다음 부분을 수정:

### 5-1. Public Key 설정 (2077줄 근처)

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // 여기에 Public Key 입력
```

예시:

```javascript
emailjs.init("user_abc123xyz");
```

### 5-2. Service ID 설정 (2103줄 근처)

```javascript
return emailjs.send(
  "YOUR_SERVICE_ID", // 여기에 Service ID 입력
  "w3t8yfm", // Template ID (이미 설정됨)
  templateParams
);
```

예시:

```javascript
return emailjs.send("service_gmail123", "w3t8yfm", templateParams);
```

## 6. 테스트

1. `request.html` 페이지에서 폼 작성
2. 제출 버튼 클릭
3. 이메일이 정상적으로 발송되는지 확인

## 참고사항

- Template ID `w3t8yfm`는 이미 생성되어 있으므로 새로 만들 필요 없음
- 변수명은 대소문자를 구분하므로 정확히 입력해야 함
- 템플릿에서 사용하지 않는 변수는 무시됨
